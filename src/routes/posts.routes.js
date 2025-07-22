import { Router } from "express";
import postsController from "../controllers/posts.controller.js";

const router = Router();

router.get("/posts", postsController.getPosts);

router.get("/posts/:id", postsController.getPost);

router.post("/users/:id/posts", postsController.createPostByUser);

router.delete("/posts/:id", postsController.deletePost);

router.put("/posts/:id", postsController.updatePost);

export default router;