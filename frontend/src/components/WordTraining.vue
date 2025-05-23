<template>
  <div class="training">
    <h2>🔁 Тренування слів</h2>

    <div class="controls">
      <div>
        <label>
          <input type="radio" value="to-ua" v-model="mode" @change="loadQuestion" /> Англ → Укр
        </label>
        <label>
          <input type="radio" value="to-en" v-model="mode" @change="loadQuestion" /> Укр → Англ
        </label>
      </div>

      <SelectTopic v-model="selectedTopic" @update:modelValue="loadQuestion" />
    </div>

    <div v-if="loading">Завантаження...</div>

    <div v-else-if="question">
      <p><strong>Слово:</strong> {{ question }}</p>

      <ul>
        <li
            v-for="option in options"
            :key="option"
            @click="selectOption(option)"
            :class="{
            correct: isAnswered && option === correctAnswer,
            wrong: isAnswered && option === selected && option !== correctAnswer
          }"
        >
          {{ option }}
        </li>
      </ul>

      <button v-if="isAnswered" @click="loadQuestion">Наступне слово</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { API_BASE_URL } from '../config.js'
import SelectTopic from "./SelectTopic.vue";

export default {
  name: 'WordTraining',
  components: {SelectTopic},
  data() {
    return {
      topics: [],
      selectedTopic: '',
      question: '',
      options: [],
      correctAnswer: '',
      correctId: null,
      selected: '',
      isAnswered: false,
      loading: false,
      error: '',
      mode: 'to-ua'
    }
  },
  methods: {
    speak(text) {
      if (!('speechSynthesis' in window)) return;
      if (this.mode !== 'to-ua') return

      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'en-US'
      utter.rate = 0.9
      speechSynthesis.cancel()
      speechSynthesis.speak(utter)
    },
    async loadQuestion() {
      this.reset()
      this.loading = true
      try {
        const url = new URL(`${API_BASE_URL}/training`)
        url.searchParams.append('mode', this.mode)
        if (this.selectedTopic) url.searchParams.append('topic', this.selectedTopic)

        const res = await fetch(url)
        const data = await res.json()

        if (!res.ok) throw new Error(data.message)

        this.question = data.question
        this.correctAnswer = data.answer
        this.options = data.options
        this.correctId = data.correctId
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async selectOption(option) {
      if (this.isAnswered) return
      this.selected = option
      this.isAnswered = true
      if (option === this.correctAnswer && this.correctId) {
        await fetch(`${API_BASE_URL}/training/${this.correctId}/mark-trained`, {
          method: 'PATCH'
        })
      }
    },
    reset() {
      this.question = ''
      this.options = []
      this.correctAnswer = ''
      this.correctId = null
      this.selected = ''
      this.isAnswered = false
      this.error = ''
    }
  },
  mounted() {
    this.loadQuestion()
  },
  watch: {
    question() {
      if (this.question) {
        this.speak(this.question)
      }
    }
  }
}
</script>

<style scoped>
.training {
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
}
.controls {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 8px 0;
  padding: 10px;
  background: #f1f1f1;
  border-radius: 5px;
  cursor: pointer;
}
li.correct {
  background: #b8f5b8;
}
li.wrong {
  background: #f5b8b8;
}
button {
  margin-top: 15px;
  padding: 10px 16px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #125ac1;
}
.error {
  margin-top: 10px;
  color: #d33;
  font-weight: bold;
}
</style>
