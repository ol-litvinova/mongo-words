import * as cardService from '../services/cardService.js';

export const getWords = async (req, res) => {
    const {topic, limit, page } = req.query;

    const result = await cardService.findWords({
        topic,
        limit,
        page
    })

    res.json(result);
}
