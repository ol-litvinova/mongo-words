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

    <div v-if="question && !loading">
      <p><strong>Слово:</strong> {{ question }}</p>

      <ul>
        <li
            v-for="option in options"
            :key="option"
            @click="selectOption(option)"
            :class="{ correct: isAnswered && option === correctAnswer, wrong: isAnswered && option === selected && option !== correctAnswer }"
        >
          {{ option }}
        </li>
      </ul>

      <button :disabled="!isAnswered" @click="loadQuestion">Наступне слово</button>
    </div>

    <div v-if="error">{{ error }}</div>
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
      selected: '',
      isAnswered: false,
      loading: false,
      error: '',
      mode: 'to-ua' // або 'to-en'
    }
  },
  methods: {
    async loadQuestion() {
      this.isAnswered = false
      this.selected = ''
      this.loading = true
      this.error = ''
      try {
        const res = await fetch(`${API_BASE_URL}/training?mode=${this.mode}`)
        if (!res.ok) throw new Error('Помилка завантаження')

        const data = await res.json()
        this.question = data.question
        this.correctAnswer = data.answer
        this.options = data.options
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    selectOption(option) {
      this.selected = option
      this.isAnswered = true
    }
  },
  mounted() {
    this.loadQuestion()
  }
}
</script>

<style scoped>
.training {
  max-width: 500px;
  margin: 0 auto;
  font-family: sans-serif;
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
  padding: 8px 16px;
  cursor: pointer;
}
</style>
