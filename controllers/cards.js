import Card from '../models/card.js';

// export async function getUsers(req, res) {
//   const users = await User.find({});
//   res.send(users);

// }
export async function getCards(req, res) {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch((res) =>
      res
        .status(500)
        .send({ message: 'Error getting Cards', error: err.message })
    );
}

export async function createCard(req, res, next) {
  const { name, link, owner } = req.body;

  // const owner = req.user._id;
  // console.log(req.user._id);

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Error creating Card', error: err.message })
    );
}

export async function deleteCardById(req, res) {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      res.send({ message: 'Card Deleted Sucessfully' });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Error deleting Card', error: err.message })
    );
}

export async function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.body._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error('Card was not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.status(200).json({ message: 'Card Like Sucessfully' });
    })
    .catch((err) => {
      const statusCode = err.statusCode || 400;
      res
        .status(statusCode)
        .json({ message: 'Error liking Card', error: err.message });
    });
}

export async function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.body._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error('Card was not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.status(200).json({ message: 'Card Dislike Sucessfully' });
    })
    .catch((err) => {
      const statusCode = err.statusCode || 400;
      res
        .status(statusCode)
        .json({ message: 'Error disliking Card', error: err.message });
    });
}

// 66fc3eb18baf7a8ae72d5a66
