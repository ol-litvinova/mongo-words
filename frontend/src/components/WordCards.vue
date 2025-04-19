<template>
  <div class="card-view">
    <h2>📘 Картки зі словами</h2>

    <div class="controls">
      <SelectTopic v-model="selectedTopic" @update:modelValue="onTopicChange" />
    </div>

    <div v-if="currentWord">
      <div class="card">
        <p class="word">{{ currentWord.english }}</p>
        <p class="translation">{{ currentWord.translation.join(', ') }}</p>
      </div>

      <div class="buttons">
        <button @click="speak(currentWord.english)">🔊 Вимовити ще раз</button>
        <button @click="nextCard">➡️ Наступне</button>
      </div>
    </div>

    <div v-else-if="loading">Завантаження...</div>
    <div v-else>Недостатньо нових слів для тренування</div>
  </div>
</template>

<script>
import { API_BASE_URL } from '../config.js'
import SelectTopic from "./SelectTopic.vue";

export default {
  name: 'WordCards',
  components: {SelectTopic},
  data() {
    return {
      cards: [],
      topics: [],
      selectedTopic: '',
      currentIndex: -1,
      page: 1,
      limit: 50,
      total: 0,
      loading: false
    }
  },
  computed: {
    currentWord() {
      return this.cards[this.currentIndex] || null
    },
    totalPages() {
      return Math.ceil(this.total / this.limit)
    }
  },
  methods: {
    async fetchCards() {
      this.loading = true
      const params = new URLSearchParams({
        page: this.page,
        limit: this.limit
      })
      if (this.selectedTopic) {
        params.append('topic', this.selectedTopic)
      }

      const res = await fetch(`${API_BASE_URL}/cards?${params.toString()}`)
      const data = await res.json()
      this.cards = data.words
      this.total = data.total
      this.currentIndex = 0
      this.loading = false
    },
    async nextCard() {
      this.currentIndex++
      if (this.currentIndex < this.cards.length) {
        return;
      }

      this.page++
      if (this.page > this.totalPages) {
        this.page = 1
      }

      await this.fetchCards()
    },
    onTopicChange() {
      this.page = 1
      this.fetchCards()
    },
    speak(text) {
      if (!('speechSynthesis' in window)) return
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'en-US'
      utter.rate = 0.9
      speechSynthesis.cancel()
      speechSynthesis.speak(utter)
    },
    handleKeydown(e) {
      if (e.key === 'ArrowRight') {
        this.nextCard()
      }
    }
  },
  watch: {
    currentIndex() {
      if (this.cards.length > 0 && this.currentIndex <= this.cards.length) {
        this.speak(this.cards[this.currentIndex].english)
      }
    }
  },
  mounted() {
    this.fetchCards()
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  },
}
</script>

<style scoped>
.card-view {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  font-family: sans-serif;
}
.controls {
  margin-bottom: 20px;
}
.card {
  padding: 20px;
  margin-bottom: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 1.5em;
  background: #f9f9f9;
}
.word {
  font-weight: bold;
  font-size: 2em;
}
.translation {
  margin-top: 10px;
  font-style: italic;
  color: #444;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}
button {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #1a73e8;
  color: white;
}
button:hover {
  background-color: #125ac1;
}
</style>
