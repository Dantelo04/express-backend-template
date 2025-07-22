import pool from "../db.js";
import { tableNames } from "../config.js";

const getPosts = async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM ${tableNames.post}`);
  res.json(rows);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT * FROM ${tableNames.post} WHERE id = $1`,
    [id]
  );
  res.json(rows[0]);
};

const createPostByUser = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    id,
  ]);

  if (userResult.rows.length === 0) {
    return res
      .status(404)
      .json({
        message: "No se encontró el usuario, no se puede crear el post",
      });
  }

  const { rows } = await pool.query(
    `INSERT INTO ${tableNames.post} (title, content, user_id) VALUES ($1, $2, $3) RETURNING *`,
    [data.title, data.content, id]
  );
  res.json(rows);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    `DELETE FROM ${tableNames.post} WHERE id = $1`,
    [id]
  );
  res.json(rows);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { rows } = await pool.query(
    `UPDATE ${tableNames.post} SET title = $1, content = $2 WHERE id = $3 RETURNING *`,
    [data.title, data.content, id]
  );
  res.json(rows);
};

export default {
  getPosts,
  getPost,
  createPostByUser,
  deletePost,
  updatePost,
};
