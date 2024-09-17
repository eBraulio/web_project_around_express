import express from "express";
import fs from "fs";
const router = express.Router();

router.get("/", function (req, res) {
  fs.readFile("./data/cards.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const cards = JSON.parse(data);
    return res.json(cards);
  });
});

export default router;
