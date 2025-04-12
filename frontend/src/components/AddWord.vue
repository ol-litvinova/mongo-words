<template>
  <div class="add-word">
    <h2>➕ Додати нове слово</h2>

    <form @submit.prevent="addWord" class="form">
      <div class="form-group">
        <label for="english">Англійське слово</label>
        <input id="english" v-model="form.english" required placeholder="Наприклад: apple" />
      </div>

      <div class="form-group">
        <label for="translation">Переклад (вводь і натискай Enter)</label>
        <input
            id="translation"
            v-model="translationInput"
            @keydown.enter.prevent="addTranslation"
            placeholder="Наприклад: яблуко"
        />
        <ul class="translation-list">
          <li v-for="(tr, i) in form.translation" :key="i">
            {{ tr }}
            <button type="button" @click="removeTranslation(i)">✖</button>
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label for="topic">Тема</label>
        <input id="topic" v-model="form.topic" placeholder="Наприклад: їжа" />
      </div>

      <div class="form-group">
        <label for="level">Рівень</label>
        <select id="level" v-model="form.level">
          <option value="">— Обери рівень —</option>
          <option v-for="lvl in levels" :key="lvl" :value="lvl">{{ lvl }}</option>
        </select>
      </div>

      <button type="submit" :disabled="form.translation.length === 0">Зберегти слово</button>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import { API_BASE_URL } from '../config.js'

export default {
  name: 'AddWord',
  data() {
    return {
      form: {
        english: '',
        translation: [],
        topic: '',
        level: ''
      },
      translationInput: '',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      message: ''
    }
  },
  methods: {
    addTranslation() {
      const trimmed = this.translationInput.trim()
      if (trimmed && !this.form.translation.includes(trimmed)) {
        this.form.translation.push(trimmed)
      }
      this.translationInput = ''
    },
    removeTranslation(index) {
      this.form.translation.splice(index, 1)
    },
    async addWord() {
      this.message = ''
      const res = await fetch(`${API_BASE_URL}/words`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })

      if (res.ok) {
        this.message = '✅ Слово успішно додано!'
        this.form = { english: '', translation: [], topic: '', level: '' }
        this.translationInput = ''
      } else {
        this.message = '❌ Помилка додавання слова.'
      }
    }
  }
}
</script>

<style scoped>
.add-word {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: 600;
  color: #444;
}

input, select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  border-color: #1a73e8;
  outline: none;
}

button[type="submit"] {
  padding: 12px;
  font-size: 1rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button[type="submit"]:hover {
  background-color: #155fc0;
}
button[type="button"] {
  background: none;
  border: none;
  color: #999;
  font-size: 0.9rem;
  cursor: pointer;
  margin-left: 10px;
}

.translation-list {
  margin-top: 8px;
  list-style: none;
  padding: 0;
}
.translation-list li {
  margin-bottom: 4px;
}
.message {
  margin-top: 20px;
  text-align: center;
  font-style: italic;
  color: #2e7d32;
}
</style>
