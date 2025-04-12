import * as wordService from '../services/wordService.js';
import {findOneWord} from "../services/wordService.js";

export const getWords = async (req, res) => {
    const words = await wordService.findWords(req.query);
    res.json(words);
};

export const addWord = async (req, res) => {
    const exist = await findOneWord(req.body.english, req.body.topic);

    if (exist) {
        return res.status(409).json({ message: 'Це слово вже існує в цій темі.' });
    }

    const word = await wordService.createWord(req.body);
    res.status(201).json(word);
};

export const updateWord = async (req, res) => {
    const updated = await wordService.updateWordById(req.params.id, req.body);
    res.json(updated);
};

export const deleteWord = async (req, res) => {
    await wordService.deleteWordById(req.params.id);
    res.status(204).end();
};

export const deleteWordsByTopic = async (req, res) => {
    const { topic } = req.params

    if (!topic) {
        return res.status(400).json({ message: 'Потрібен topic у параметрі URL' })
    }

    try {
        const result = await wordService.deleteWordsByTopic(topic)
        res.json({ message: `Видалено ${result.deletedCount} слів з теми "${topic}"` })
    } catch (err) {
        res.status(500).json({ message: 'Помилка видалення', error: err.message })
    }
}
