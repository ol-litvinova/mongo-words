import Word from '../models/Word.js';

export const findWords = async ({ topic, level, search }) => {
    const filter = {};
    if (topic) filter.topic = topic;
    if (level) filter.level = level;
    if (search) filter.english = new RegExp(search, 'i');
    return Word.find(filter);
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
