import express from 'express';
import {
    getWords,
    addWord,
    updateWord,
    deleteWord,
    deleteWordsByTopic
} from '../controllers/wordController.js';

const router = express.Router();

router.get('/', getWords);
router.post('/', addWord);
router.put('/:id', updateWord);
router.delete('/:id', deleteWord);
router.delete('/topic/:topic', deleteWordsByTopic)

export default router;
