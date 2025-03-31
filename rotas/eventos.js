// routes/eventos.js
const express = require('express');
const router = express.Router();
const db = require('../database');

// CREATE
router.post('/', (req, res) => {
  const {
    nome_evento,
    cliente, // ID do cliente
    meio_agendamento,
    local_evento,
    data_evento,
    tipo_evento,
    atendente_responsavel,
    observacoes,
    horas_duracao
  } = req.body;

  const sql = `
    INSERT INTO evento (
      nome_evento,
      cliente,
      meio_agendamento,
      local_evento,
      data_evento,
      tipo_evento,
      atendente_responsavel,
      observacoes,
      horas_duracao
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    nome_evento,
    cliente,
    meio_agendamento,
    local_evento,
    data_evento,
    tipo_evento,
    atendente_responsavel,
    observacoes,
    horas_duracao
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Erro ao criar evento:', err);
      return res.status(500).json({ error: 'Erro ao criar evento.' });
    }
    return res.status(201).json({
      message: 'Evento criado com sucesso.',
      eventoId: this.lastID
    });
  });
});

// READ ALL
router.get('/', (req, res) => {
  // Podemos trazer também dados do cliente se quisermos (join com tabela clientes)
  // Exemplo de join simples:
  const sql = `
    SELECT e.*, c.nome_completo AS nome_cliente
    FROM evento e
    JOIN clientes c ON e.cliente = c.id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao listar eventos:', err);
      return res.status(500).json({ error: 'Erro ao listar eventos.' });
    }
    return res.json(rows);
  });
});

// READ ONE
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT e.*, c.nome_completo AS nome_cliente
    FROM evento e
    JOIN clientes c ON e.cliente = c.id
    WHERE e.id = ?
  `;
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Erro ao obter evento:', err);
      return res.status(500).json({ error: 'Erro ao obter evento.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    return res.json(row);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    nome_evento,
    cliente,
    meio_agendamento,
    local_evento,
    data_evento,
    tipo_evento,
    atendente_responsavel,
    observacoes,
    horas_duracao
  } = req.body;

  const sql = `
    UPDATE evento
    SET
      nome_evento = ?,
      cliente = ?,
      meio_agendamento = ?,
      local_evento = ?,
      data_evento = ?,
      tipo_evento = ?,
      atendente_responsavel = ?,
      observacoes = ?,
      horas_duracao = ?
    WHERE id = ?
  `;

  const params = [
    nome_evento,
    cliente,
    meio_agendamento,
    local_evento,
    data_evento,
    tipo_evento,
    atendente_responsavel,
    observacoes,
    horas_duracao,
    id
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Erro ao atualizar evento:', err);
      return res.status(500).json({ error: 'Erro ao atualizar evento.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    return res.json({ message: 'Evento atualizado com sucesso.' });
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM evento WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Erro ao deletar evento:', err);
      return res.status(500).json({ error: 'Erro ao deletar evento.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    return res.json({ message: 'Evento deletado com sucesso.' });
  });
});

module.exports = router;
