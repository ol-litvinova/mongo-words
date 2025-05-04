import * as trainingService from '../services/trainingService.js'

export const getTraining = async (req, res) => {
    const { mode, topic } = req.query;
    try {
        const training = await trainingService.generateTraining(mode, topic)
        res.json(training)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const markWordTrained = async (req, res) => {
    try {
        await trainingService.markAsTrained(req.params.id)
        res.json({ message: 'Слово позначено як пройдене' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const resetTraining = async (req, res) => {
    const { topic } = req.query

    try {
        const modifiedCount = await trainingService.resetTrainingProgress(topic)
        res.json({ message: 'Прогрес скинуто', modifiedCount })
    } catch (err) {
        res.status(500).json({ message: 'Помилка при скиданні', error: err.message })
    }
}