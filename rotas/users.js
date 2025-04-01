// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../database');

// CREATE
router.post('/', (req, res) => {
  const { username, password } = req.body;
  const sql = `
    INSERT INTO users (username, password)
    VALUES (?, ?)
  `;
  db.run(sql, [username, password], function (err) {
    if (err) {
      console.error('Erro ao criar usuário:', err);
      return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
    return res.status(201).json({
      message: 'Usuário criado com sucesso.',
      userId: this.lastID
    });
  });
});

// READ ALL
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao listar usuários:', err);
      return res.status(500).json({ error: 'Erro ao listar usuários.' });
    }
    return res.json(rows);
  });
});

// READ ONE
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Erro ao obter usuário:', err);
      return res.status(500).json({ error: 'Erro ao obter usuário.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.json(row);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const sql = `
    UPDATE users
    SET
      username = ?,
      password = ?
    WHERE id = ?
  `;
  db.run(sql, [username, password, id], function (err) {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.json({ message: 'Usuário atualizado com sucesso.' });
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      return res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.json({ message: 'Usuário deletado com sucesso.' });
  });
});

module.exports = router;
