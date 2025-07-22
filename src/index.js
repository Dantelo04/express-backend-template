import express from "express";
import { config } from "./config.js";
import usersRoutes from "./routes/users.routes.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(usersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});