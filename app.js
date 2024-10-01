import express from 'express';
// const mongoose = require('mongoose');
import userRoutes from './routes/users.js';
import cardsRoutes from './routes/cards.js';
import mongoose from 'mongoose';

const app = express();
mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('conectado a la base de datos');
  })
  .catch((err) => {
    console.log('algo debió de salir mal', err);
  });

app.use(express.json());
app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(3000, () => {
  console.log('servidor corriendoo!');
});
