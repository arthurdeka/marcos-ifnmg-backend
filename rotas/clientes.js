// routes/clientes.js
const express = require('express');
const router = express.Router();
const db = require('../database');

// ========================
// CREATE - POST /clientes
// ========================
router.post('/', (req, res) => {
  const { nome_completo, cpf_cnpj, telefone, email, endereco, observacoes } = req.body;

  const sql = `
    INSERT INTO clientes (
      nome_completo, cpf_cnpj, telefone, email, endereco, observacoes
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  const params = [nome_completo, cpf_cnpj, telefone, email, endereco, observacoes];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Erro ao criar cliente:', err);
      return res.status(500).json({ error: 'Erro ao criar cliente.' });
    }
    return res.status(201).json({
      message: 'Cliente criado com sucesso.',
      clienteId: this.lastID
    });
  });
});

// ========================
// READ ALL - GET /clientes
// ========================
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao listar clientes:', err);
      return res.status(500).json({ error: 'Erro ao listar clientes.' });
    }
    return res.json(rows);
  });
});

// ========================
// READ ONE - GET /clientes/:id
// ========================
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM clientes WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Erro ao obter cliente:', err);
      return res.status(500).json({ error: 'Erro ao obter cliente.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    return res.json(row);
  });
});

// ========================
// UPDATE - PUT /clientes/:id
// ========================
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome_completo, cpf_cnpj, telefone, email, endereco, observacoes } = req.body;

  const sql = `
    UPDATE clientes
    SET nome_completo = ?,
        cpf_cnpj = ?,
        telefone = ?,
        email = ?,
        endereco = ?,
        observacoes = ?
    WHERE id = ?
  `;

  const params = [nome_completo, cpf_cnpj, telefone, email, endereco, observacoes, id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Erro ao atualizar cliente:', err);
      return res.status(500).json({ error: 'Erro ao atualizar cliente.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    return res.json({ message: 'Cliente atualizado com sucesso.' });
  });
});

// ========================
// DELETE - DELETE /clientes/:id
// ========================
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM clientes WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Erro ao deletar cliente:', err);
      return res.status(500).json({ error: 'Erro ao deletar cliente.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    return res.json({ message: 'Cliente deletado com sucesso.' });
  });
});

module.exports = router;
