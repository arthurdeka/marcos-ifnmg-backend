const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = $1 AND password = $2';

  try {
    const result = await pool.query(sql, [username, password]);
    const user = result.rows[0];

    if (user) {
      return res.status(200).json({ message: 'Login válido', user });
    } else {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;
