import { createRouter, createWebHistory } from 'vue-router'
import WordList from './components/WordList.vue'
import WordTraining from './components/WordTraining.vue'
import AddWord from './components/AddWord.vue'
import WordCard from "./components/WordCards.vue";

const routes = [
    { path: '/', redirect: '/words' },
    { path: '/words', component: WordList },
    { path: '/training', component: WordTraining },
    { path: '/add', component: AddWord },
    { path: '/cards', component: WordCard }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
