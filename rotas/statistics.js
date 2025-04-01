const express = require('express');
const router = express.Router();
const pool = require('../db'); // conexão PostgreSQL

router.get('/', async (req, res) => {
  try {
    const eventosResult = await pool.query('SELECT COUNT(*) AS total_eventos FROM evento');
    const clientesResult = await pool.query('SELECT COUNT(*) AS total_clientes FROM clientes');
    const usuariosResult = await pool.query('SELECT COUNT(*) AS total_usuarios FROM users');

    res.json({
      totalEventos: parseInt(eventosResult.rows[0].total_eventos),
      totalClientes: parseInt(clientesResult.rows[0].total_clientes),
      totalUsuarios: parseInt(usuariosResult.rows[0].total_usuarios)
    });
  } catch (err) {
    console.error('Erro ao buscar estatísticas:', err);
    res.status(500).json({ error: 'Erro ao buscar estatísticas.' });
  }
});

module.exports = router;
