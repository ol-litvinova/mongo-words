import express from 'express'
import {
    getTraining,
    markWordTrained,
    resetTraining
} from '../controllers/trainingController.js'

const router = express.Router()

router.get('/', getTraining)
router.patch('/:id/mark-trained', markWordTrained)
router.delete('/progress/reset', resetTraining)

export default router
