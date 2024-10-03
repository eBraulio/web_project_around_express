import express from 'express';
import {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';

const router = express.Router();

router.get('/', getCards);
router.post('/', createCard);
//DELETE para eliminar una tarjeta
router.delete('/:cardId', deleteCardById);

//PUT para darle like a una tarjeta
router.put('/:cardId/likes', likeCard);

//DELTE para quitar el like a una tarjeta
router.delete('/:cardId/likes', dislikeCard);

export default router;
