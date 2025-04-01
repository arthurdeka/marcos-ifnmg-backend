const express = require('express');
const router = express.Router();
const pool = require('../db'); // conexão PostgreSQL

// CREATE
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING id
  `;

  try {
    const result = await pool.query(sql, [username, password]);
    res.status(201).json({
      message: 'Usuário criado com sucesso.',
      userId: result.rows[0].id
    });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao obter usuário:', err);
    res.status(500).json({ error: 'Erro ao obter usuário.' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  const sql = `
    UPDATE users
    SET username = $1, password = $2
    WHERE id = $3
  `;

  try {
    const result = await pool.query(sql, [username, password, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
});

module.exports = router;
