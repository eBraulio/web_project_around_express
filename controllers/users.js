import User from '../models/user.js';

export async function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res.status(500).json({ message: 'Error retrieving users', error: err })
    );
}

export async function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) =>
      res.status(500).json({ message: 'Error creating user', error: err })
    );
}

export async function getUserById(req, res) {
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if ((err.statusCode = 404)) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Error retrieving user', error: err });
    });
}

export async function updateUser(req, res) {
  console.log(req.params.userId);
  // const { userId } = req.params;
  const { name, about } = req.body;

  // validate if userId is a valid ObjectId
  // if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
  //   return res.status(400).json({ message: 'Invalid user ID' });
  // }

  User.findByIdAndUpdate(
    req.params.userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid data', error: err });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Error updating user', error: err });
    });
}

export async function updateUserAvatar(req, res) {
  console.log(req.params.userId);
  // const { userId } = req.params;
  const { avatar } = req.body;

  // // validate if userId is a valid ObjectId
  // if (!mongoose.Types.ObjectId.isValid(userId)) {
  //   return res.status(400).json({ message: 'Invalid userID' });
  // }

  User.findByIdAndUpdate(
    req.params.userId,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid data', error: err });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Error updating avatar', error: err });
    });
}
