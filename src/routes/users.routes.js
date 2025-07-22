import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const router = Router();

router.get("/users", usersController.getUsers);

router.get("/users/:id", usersController.getUser);

router.post("/users", usersController.createUser);

router.delete("/users/:id", usersController.deleteUser);

router.put("/users/:id", usersController.updateUser);

router.get("/users/:id/posts", usersController.getPostsByUser);

export default router;
