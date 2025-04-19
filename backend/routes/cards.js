import express from 'express';
import {getWords} from "../controllers/cardController.js";

const router = express.Router();

router.get('/', getWords);

export default router;
