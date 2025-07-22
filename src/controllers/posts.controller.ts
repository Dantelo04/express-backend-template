import prisma from "../prisma.js";
import { Request, Response } from "express";

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.posts.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener posts" });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.posts.findFirst({
      where: { id: parseInt(id) }
    });
    
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener post" });
  }
};

const createPostByUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const user = await prisma.users.findFirst({
      where: { id: parseInt(id) }
    });

    if (!user) {
      return res.status(404).json({
        message: "No se encontró el usuario, no se puede crear el post",
      });
    }

    const post = await prisma.posts.create({
      data: {
        title: data.title,
        content: data.content,
        user_id: parseInt(id)
      }
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post" });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.posts.delete({
      where: { id: parseInt(id) }
    });
    res.json(post);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.status(500).json({ message: "Error al eliminar el post" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const post = await prisma.posts.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        content: data.content
      }
    });
    res.json(post);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.status(500).json({ message: "Error al actualizar el post" });
  }
};

export default {
  getPosts,
  getPost,
  createPostByUser,
  deletePost,
  updatePost,
};
