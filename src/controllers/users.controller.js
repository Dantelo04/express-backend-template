import pool from "../db.js";
import { tableNames } from "../config.js";

const getUsers = async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM ${tableNames.user}`);
  res.json(rows);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM ${tableNames.user} WHERE id = $1`,
    [id]
  );
  res.json(rows[0]);
};

const createUser = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query(
      `INSERT INTO ${tableNames.user} (name, email) VALUES ($1, $2) RETURNING *`,
      [data.name, data.email]
    );
    res.json(rows);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `DELETE FROM ${tableNames.user} WHERE id = $1`,
    [id]
  );
  res.json(rows);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { rows } = await pool.query(
    `UPDATE ${tableNames.user} SET name = $1, email = $2 WHERE id = $3 RETURNING *`,
    [data.name, data.email, id]
  );
  res.json(rows);
};

const getPostsByUser = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM ${tableNames.post} WHERE user_id = $1`,
    [id]
  );
  res.json(rows);
};

export default {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getPostsByUser,
};
