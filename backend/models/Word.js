import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
    english: { type: String, required: true },
    translation: { type: [String], required: true }, // ← тут масив
    topic: { type: String },
    level: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
}, { timestamps: true });

export default mongoose.model('Word', WordSchema);
