import express from "express";
import userRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/cards", cardsRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(3000, function () {
  console.log("servidor corriendoo!");
});
