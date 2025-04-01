// routes/statistics.js
const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  // Consulta para contar os eventos
  db.get('SELECT COUNT(*) AS totalEventos FROM evento', (err, eventosRow) => {
    if (err) {
      console.error('Erro ao contar eventos:', err);
      return res.status(500).json({ error: 'Erro ao contar eventos.' });
    }
    // Consulta para contar os clientes
    db.get('SELECT COUNT(*) AS totalClientes FROM clientes', (err, clientesRow) => {
      if (err) {
        console.error('Erro ao contar clientes:', err);
        return res.status(500).json({ error: 'Erro ao contar clientes.' });
      }
      // Consulta para contar os usuários
      db.get('SELECT COUNT(*) AS totalUsuarios FROM users', (err, usuariosRow) => {
        if (err) {
          console.error('Erro ao contar usuários:', err);
          return res.status(500).json({ error: 'Erro ao contar usuários.' });
        }
        return res.json({
          totalEventos: eventosRow.totalEventos,
          totalClientes: clientesRow.totalClientes,
          totalUsuarios: usuariosRow.totalUsuarios
        });
      });
    });
  });
});

module.exports = router;
