<template>
  <div class="training">
    <h2>🔁 Тренування слів</h2>

    <div class="mode-switch">
      <label>
        <input type="radio" value="to-ua" v-model="mode" @change="loadQuestion" />
        Англійське → Українське
      </label>
      <label>
        <input type="radio" value="to-en" v-model="mode" @change="loadQuestion" />
        Українське → Англійське
      </label>
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

export default {
  name: 'WordTraining',
  data() {
    return {
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
    async loadQuestion() {
      this.reset()
      this.loading = true
      try {
        const res = await fetch(`${API_BASE_URL}/training?mode=${this.mode}`)
        if (!res.ok) throw new Error('Помилка завантаження')
        const data = await res.json()
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

      const isCorrect = option === this.correctAnswer
      if (isCorrect && this.correctId) {
        await fetch(`${API_BASE_URL}/training/${this.correctId}/mark-trained`, {
          method: 'PATCH'
        })
      }
    },
    speak(text) {
      if (!('speechSynthesis' in window)) return;
      if (this.mode !== 'to-en') return

      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'en-US'
      utter.rate = 0.9
      speechSynthesis.cancel()
      speechSynthesis.speak(utter)
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
      this.speak(this.question)
    }
  },
}
</script>

<style scoped>
.training {
  max-width: 500px;
  margin: 0 auto;
  font-family: sans-serif;
}
.mode-switch {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
}
.mode-switch label {
  font-size: 0.9em;
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
  transition: background-color 0.2s;
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
