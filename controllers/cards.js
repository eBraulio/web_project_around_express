import Card from '../models/card.js';

// export async function getUsers(req, res) {
//   const users = await User.find({});
//   res.send(users);

// }
export async function getCards(req, res) {
  const cards = await Card.find({}).populate('owner');
  res.send(cards);
}

export async function createCard(req, res) {
  const { name, link } = req.body; //owner removed
  const owner = req.user._id;
  const newCard = await Card.create({
    name: name,
    link: link,
    owner: owner,
  });
  res.send(newCard);
}

export async function deleteCardById(req, res) {}

export async function likeCard(req, res) {}

export async function dislikeCard(req, res) {}

// 66fc3eb18baf7a8ae72d5a66
