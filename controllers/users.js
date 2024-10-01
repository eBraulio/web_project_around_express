import User from '../models/user.js';

export async function getUsers(req, res) {
  const users = await User.find({});
  res.send(users);
  // fs.readFile('./data/users.json', 'utf-8', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   const users = JSON.parse(data);
  //   return res.json(users);
  // });
}

export async function createUser(req, res) {
  const { about, name } = req.body;
  const newUser = await User.create({
    name,
    about,
  });
  res.send(newUser);
}

export async function getUserById(req, res) {
  const { id } = req.params;
}
