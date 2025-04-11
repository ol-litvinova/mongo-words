import * as wordService from '../services/wordService.js';

export const getWords = async (req, res) => {
    const words = await wordService.findWords(req.query);
    res.json(words);
};

export const addWord = async (req, res) => {
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
