import Word from '../models/Word.js';

export const findWords = async ({ topic, search }) => {
    const filter = {};
    if (topic) filter.topic = topic;
    if (search) filter.english = new RegExp(search, 'i');
    return Word.find(filter);
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
