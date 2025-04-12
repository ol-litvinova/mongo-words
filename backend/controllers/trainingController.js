import { generateTraining } from '../services/trainingService.js';

export const getTraining = async (req, res) => {
    const mode = req.query.mode || 'to-ua';
    try {
        const data = await generateTraining(mode);
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
