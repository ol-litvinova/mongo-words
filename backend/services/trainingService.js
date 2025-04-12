import Word from '../models/Word.js';

export const generateTraining = async (mode = 'to-ua') => {
    const allWords = await Word.find();
    if (allWords.length < 5) {
        throw new Error('Not enough words in dictionary');
    }

    const correct = allWords[Math.floor(Math.random() * allWords.length)];
    const others = allWords.filter(w => w._id.toString() !== correct._id.toString());
    const distractors = others.sort(() => 0.5 - Math.random()).slice(0, 4);
    const options = [...distractors, correct].sort(() => 0.5 - Math.random());

    return {
        question: mode === 'to-ua' ? correct.english : correct.translation,
        answer: mode === 'to-ua' ? correct.translation : correct.english,
        options: options.map(w => mode === 'to-ua' ? w.translation : w.english),
    };
};
