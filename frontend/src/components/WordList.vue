<template>
  <div>
    <h2>Список слів</h2>
    <ul>
      <li v-for="word in words" :key="word._id">
        <strong>{{ word.english }}</strong> — {{ word.translation }}
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
  async mounted() {
    const res = await fetch(`${API_BASE_URL}/words`)
    this.words = await res.json()
  }
}
</script>
