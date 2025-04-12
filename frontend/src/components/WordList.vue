<template>
  <div>
    <h2>Список слів</h2>

    <div class="filter">
      <label for="topic">Фільтр за темою:</label>
      <select id="topic" v-model="selectedTopic" @change="fetchWords">
        <option value="">Усі теми</option>
        <option v-for="topic in availableTopics" :key="topic" :value="topic">
          {{ topic }}
        </option>
      </select>
    </div>

    <ul>
      <li v-for="word in words" :key="word._id" class="word-item">
        <span>
          <strong>{{ word.english }}</strong> — {{ word.translation.join(', ') }}
          <span v-if="word.trained" class="check">✅</span>
        </span>
        <button class="delete-btn" @click="deleteWord(word._id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { API_BASE_URL } from '../config.js'

export default {
  name: 'WordList',
  data() {
    return {
      words: [],
      selectedTopic: '',
      availableTopics: []
    }
  },
  methods: {
    async fetchWords() {
      const url = this.selectedTopic
          ? `${API_BASE_URL}/words?topic=${encodeURIComponent(this.selectedTopic)}`
          : `${API_BASE_URL}/words`

      const res = await fetch(url)
      this.words = await res.json()
    },
    async fetchTopics() {
      const res = await fetch(`${API_BASE_URL}/topics`)
      this.availableTopics = await res.json()
    },
    async deleteWord(id) {
      const confirmDelete = confirm('Ви впевнені, що хочете видалити це слово?')
      if (!confirmDelete) return

      const res = await fetch(`${API_BASE_URL}/words/${id}`, { method: 'DELETE' })
      if (res.ok) {
        this.words = this.words.filter(w => w._id !== id)
      } else {
        alert('Помилка видалення')
      }
    }
  },
  mounted() {
    this.fetchTopics()
    this.fetchWords()
  }
}
</script>

<style scoped>
.filter {
  margin-bottom: 15px;
}
.word-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 6px;
  border-bottom: 1px solid #ddd;
}
.delete-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #c00;
  transition: color 0.2s;
}
.delete-btn:hover {
  color: #f33;
}
.check {
  margin-left: 8px;
  font-size: 1.1em;
  color: green;
}
</style>
