<template>
  <select v-model="internalValue" @change="emitChange">
    <option value="">Всі теми</option>
    <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
  </select>
</template>

<script>
import { API_BASE_URL } from '../config.js'

export default {
  name: 'SelectTopic',
  props: {
    modelValue: String
  },
  data() {
    return {
      topics: [],
      internalValue: this.modelValue
    }
  },
  watch: {
    modelValue(newVal) {
      this.internalValue = newVal
    }
  },
  methods: {
    emitChange() {
      this.$emit('update:modelValue', this.internalValue)
    }
  },
  async mounted() {
    const res = await fetch(`${API_BASE_URL}/topics`)
    this.topics = await res.json()
  }
}
</script>

<style scoped>
select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  background: white;
  border-radius: 6px;
  transition: border-color 0.3s;
}
</style>
