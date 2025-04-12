<template>
  <div>
    <h2>Список слів</h2>
    <ul>
      <li v-for="word in words" :key="word._id" class="word-item">
        <span>
          <strong>{{ word.english }}</strong> — {{ word.translation }}
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
      words: []
    }
  },
  methods: {
    async fetchWords() {
      const res = await fetch(`${API_BASE_URL}/words`)
      this.words = await res.json()
    },
    async deleteWord(id) {
      const confirmDelete = confirm('Ви впевнені, що хочете видалити це слово?')
      if (!confirmDelete) return

      const res = await fetch(`${API_BASE_URL}/words/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        this.words = this.words.filter(word => word._id !== id)
      } else {
        alert('Помилка видалення')
      }
    }
  },
  mounted() {
    this.fetchWords()
  }
}
</script>

<style scoped>
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
</style>
