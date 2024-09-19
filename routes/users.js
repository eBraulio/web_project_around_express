import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("./data/users.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    return res.json(users);
  });
});
router.get("/:id", (req, res) => {
  fs.readFile("./data/users.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);
    if (user) {
      return res.json(user);
    }
    return res.status(404).json({ Message: "ID de usuario no encontrado" });
  });
});

export default router;
