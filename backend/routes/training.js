import express from 'express';
import { getTraining } from '../controllers/trainingController.js';

const router = express.Router();

router.get('/', getTraining);

export default router;
