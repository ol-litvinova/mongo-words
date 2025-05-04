import Word from '../models/Word.js'

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const generateTraining = async (mode = 'to-ua', topic = null) => {
    const filter = { trained: null }
    if (topic) filter.topic = topic

    const allWords = await Word.find(filter)

    if (allWords.length === 0) {
        throw new Error('Недостатньо нових слів для тренування')
    }

    const correct = getRandom(allWords)
    const distractorsPool = allWords.filter(w => w._id.toString() !== correct._id.toString())
    const distractors = getRandomSubset(distractorsPool, 4)
    const options = [...distractors, correct].sort(() => 0.5 - Math.random())

    return {
        question: mode === 'to-ua' ? correct.english : getRandom(correct.translation),
        answer: mode === 'to-ua' ? correct.translation.join(', ') : correct.english,
        options: options.map(w => mode === 'to-ua' ? w.translation.join(', ') : w.english),
        correctId: correct._id
    }
}

export const markAsTrained = async (wordId) => {
    await Word.findByIdAndUpdate(wordId, { trained: true })
}

export const resetTrainingProgress = async (topic = null) => {
    const filter = {}
    if (topic) {
        filter.topic = topic
    }

    const result = await Word.updateMany(filter, { $set: { trained: null } })
    return result.modifiedCount
}

function getRandomSubset(array, n) {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, n)
}
