import * as trainingService from '../services/trainingService.js'

export const getTraining = async (req, res) => {
    try {
        const mode = req.query.mode || 'to-ua'
        const training = await trainingService.generateTraining(mode)
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
    try {
        await trainingService.resetTrainingProgress()
        res.json({ message: 'Прогрес скинуто' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
