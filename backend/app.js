import express from 'express';
import mongoose from 'mongoose';
import wordsRouter from './routes/words.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/words', wordsRouter);

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/mydictionary';

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
    })
    .catch((err) => console.error('MongoDB connection error:', err));
