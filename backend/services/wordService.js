import Word from '../models/Word.js';

export const findWords = async ({ topic, search, page, limit }) => {
    const filter = {};
    if (topic) filter.topic = topic;
    if (search) filter.english = new RegExp(search, 'i');

    const skip = (page - 1) * limit;

    const words = await Word.find(filter)
        .skip(skip)
        .limit(limit);

    const total = await Word.countDocuments(filter);

    return {
        words,
        total
    };
};

export const findOneWord = async (word, topic) => {
    return Word.findOne({
        english: word,
        topic: topic
    });
};

export const createWord = async (data) => {
    const word = new Word(data);
    return word.save();
};

export const updateWordById = async (id, data) => {
    return Word.findByIdAndUpdate(id, data, { new: true });
};

export const deleteWordById = async (id) => {
    return Word.findByIdAndDelete(id);
};

export const deleteWordsByTopic = async (topic) => {
    return Word.deleteMany({ topic })
}
