import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import wordsRouter from './routes/words.js';
import trainingRouter from './routes/training.js';
import topicsRouter from './routes/topics.js';

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173', // або '*' для всіх
}));

app.use(express.json());

app.use('/api/words', wordsRouter);
app.use('/api/training', trainingRouter);
app.use('/api/topics', topicsRouter);

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/mydictionary';

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
    })
    .catch((err) => console.error('MongoDB connection error:', err));
