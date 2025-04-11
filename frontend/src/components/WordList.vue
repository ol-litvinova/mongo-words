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

<script setup>
import { ref, onMounted } from 'vue'

const words = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:3002/api/words')
  words.value = await res.json()
})
</script>
