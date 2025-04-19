import Word from "../models/Word.js";

export const findWords = async ({ topic, page, limit }) => {
    const filter = { trained: null };
    if (topic) filter.topic = topic;

    const skip = (page - 1) * limit;

    const words = await Word.find(filter)
        .skip(skip)
        .limit(limit);

    const total = await Word.countDocuments(filter);

    return {
        words,
        total
    };
}