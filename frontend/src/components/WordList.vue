<template>
  <div>
    <h2>Список слів</h2>

    <div class="filter">
      <SelectTopic v-model="selectedTopic" @update:modelValue="changeTopic" />
      <button @click="resetProgress">♻️ Скинути прогрес</button>
    </div>

    <ul class="words-list">
      <li v-for="word in words" :key="word._id" class="word-item">
        <span>
          <strong>{{ word.english }}</strong> — {{ word.translation.join(', ') }}
          <span v-if="word.trained" class="check">✅</span>
        </span>
        <button class="delete-btn" @click="deleteWord(word._id)">🗑️</button>
      </li>
    </ul>

    <div class="pagination">
      <button :disabled="page === 1" @click="page-- && fetchWords()">⬅️ Назад</button>
      <span>Сторінка {{ page }} з {{ totalPages }}</span>
      <button :disabled="page === totalPages" @click="page++ && fetchWords()">Вперед ➡️</button>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '../config.js'
import SelectTopic from "./SelectTopic.vue";

export default {
  name: 'WordList',
  components: {SelectTopic},
  data() {
    return {
      words: [],
      selectedTopic: '',
      availableTopics: [],
      page: 1,
      limit: 10,
      total: 0
    }
  },
  methods: {
    async changeTopic() {
      this.page = 1
      await this.fetchWords()
    },
    async fetchWords() {
      const params = new URLSearchParams({
        topic: this.selectedTopic,
        limit: this.limit,
        page: this.page
      })

      const res = await fetch(`${API_BASE_URL}/words?` + params.toString())
      const data = await res.json()
      this.words = data.words
      this.total = data.total
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
    },
    async resetProgress() {
      if (!confirm('Ви впевнені, що хочете скинути прогрес?')) return

      const params = new URLSearchParams()
      if (this.selectedTopic) params.append('topic', this.selectedTopic)

      const res = await fetch(`${API_BASE_URL}/training/progress/reset?${params.toString()}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      alert(data.message + ` (${data.modifiedCount} записів скинуто)`)
    }
  },
  mounted() {
    this.fetchWords()
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit)
    }
  }
}
</script>

<style scoped>
.filter {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.words-list {
  list-style: none;
  padding-left: 0;
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
.filter {
  text-align: right;

  select {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    background: white;
    border-radius: 6px;
    transition: border-color 0.3s;
  }
}
</style>
