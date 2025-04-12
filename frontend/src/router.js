import { createRouter, createWebHistory } from 'vue-router'
import WordList from './components/WordList.vue'
import WordTraining from './components/WordTraining.vue'

const routes = [
    { path: '/', redirect: '/words' },
    { path: '/words', component: WordList },
    { path: '/training', component: WordTraining }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
