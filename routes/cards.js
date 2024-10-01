import express from 'express';
import fs from 'fs';
import { getCards, createCard, deleteCardById } from '../controllers/cards.js';

const router = express.Router();

router.get('/', getCards);
router.post('/', createCard);

export default router;
