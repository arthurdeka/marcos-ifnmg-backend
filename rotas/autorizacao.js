const express = require('express');
const router = express.Router();
const db = require('../database');

// POST /login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.get(sql, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
    if (row) {
      // Retorna os dados do usuário
      return res.status(200).json({ message: 'Login válido', user: row });
    } else {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

module.exports = router;
