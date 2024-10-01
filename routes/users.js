import express from 'express';
import { getUsers, createUser, getUserById } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
// router.get('/:id', (req, res) => {
//   fs.readFile('./data/users.json', 'utf-8', (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     const users = JSON.parse(data);
//     const user = users.find((u) => u._id === req.params.id);
//     if (user) {
//       return res.json(user);
//     }
//     return res.status(404).json({ Message: 'ID de usuario no encontrado' });
//   });
// });

router.get('/:id', getUserById);
router.post('/', createUser);

export default router;
