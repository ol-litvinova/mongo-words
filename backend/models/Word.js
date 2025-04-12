import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
    english: { type: String, required: true },
    translation: { type: [String], required: true },
    topic: String,
    trained: { type: Boolean, default: null }
}, { timestamps: true });

export default mongoose.model('Word', WordSchema);
