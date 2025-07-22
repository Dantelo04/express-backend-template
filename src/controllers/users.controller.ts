import prisma from "../prisma.js";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findFirst({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
    res.json(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.delete({
      where: { id: parseInt(id) },
    });
    res.json(user);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        email: data.email,
      },
    });
    res.json(user);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (error.code === "P2002") {
      return res.status(400).json({ message: "El email ya existe" });
    }
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const posts = await prisma.posts.findMany({
      where: { user_id: parseInt(id) },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener posts del usuario" });
  }
};

export default {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getPostsByUser,
};
