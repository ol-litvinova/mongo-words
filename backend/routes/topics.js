import express from 'express';
import Word from '../models/Word.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const topics = await Word.distinct('topic');
    res.json(topics.filter(Boolean)); // виключає порожні значення
});

export default router;
