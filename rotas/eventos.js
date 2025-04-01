const express = require('express');
const router = express.Router();
const pool = require('../db'); // conexão PostgreSQL

// CREATE
router.post('/', async (req, res) => {
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
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id
  `;

  try {
    const result = await pool.query(sql, [
      nome_evento,
      cliente,
      meio_agendamento,
      local_evento,
      data_evento,
      tipo_evento,
      atendente_responsavel,
      observacoes,
      horas_duracao
    ]);
    res.status(201).json({
      message: 'Evento criado com sucesso.',
      eventoId: result.rows[0].id
    });
  } catch (err) {
    console.error('Erro ao criar evento:', err);
    res.status(500).json({ error: 'Erro ao criar evento.' });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const sql = `
    SELECT e.*, c.nome_completo AS nome_cliente
    FROM evento e
    JOIN clientes c ON e.cliente = c.id
  `;

  try {
    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar eventos:', err);
    res.status(500).json({ error: 'Erro ao listar eventos.' });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT e.*, c.nome_completo AS nome_cliente
    FROM evento e
    JOIN clientes c ON e.cliente = c.id
    WHERE e.id = $1
  `;

  try {
    const result = await pool.query(sql, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao obter evento:', err);
    res.status(500).json({ error: 'Erro ao obter evento.' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
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
      nome_evento = $1,
      cliente = $2,
      meio_agendamento = $3,
      local_evento = $4,
      data_evento = $5,
      tipo_evento = $6,
      atendente_responsavel = $7,
      observacoes = $8,
      horas_duracao = $9
    WHERE id = $10
  `;

  try {
    const result = await pool.query(sql, [
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
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    res.json({ message: 'Evento atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar evento:', err);
    res.status(500).json({ error: 'Erro ao atualizar evento.' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM evento WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    res.json({ message: 'Evento deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar evento:', err);
    res.status(500).json({ error: 'Erro ao deletar evento.' });
  }
});

module.exports = router;
