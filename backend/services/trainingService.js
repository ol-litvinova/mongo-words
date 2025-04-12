import Word from '../models/Word.js';

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const generateTraining = async (mode = 'to-ua') => {
    const allWords = await Word.find();
    if (allWords.length < 5) {
        throw new Error('Not enough words in dictionary');
    }

    // Випадкове правильне слово
    const correct = getRandom(allWords);

    // Відсіюємо його з варіантів
    const distractorsPool = allWords.filter(w => w._id.toString() !== correct._id.toString());

    // Беремо 4 випадкових неправильних варіанти
    const distractors = getRandomSubset(distractorsPool, 4);

    // Формуємо варіанти
    const options = [...distractors, correct].sort(() => 0.5 - Math.random());

    return {
        question: mode === 'to-ua' ? correct.english : getRandom(correct.translation),
        answer: mode === 'to-ua' ? getRandom(correct.translation) : correct.english,
        options: options.map(w =>
            mode === 'to-ua' ? getRandom(w.translation) : w.english
        )
    };
};

// Вибирає N випадкових елементів із масиву
function getRandomSubset(array, n) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}
