const express = require('express');
const router = express.Router();
const pool = require('../db'); // conexão com PostgreSQL

// ========================
// CREATE - POST /clientes
// ========================
router.post('/', async (req, res) => {
  const { nome_completo, cpf_cnpj, telefone, email, endereco, observacoes } = req.body;

  const sql = `
    INSERT INTO clientes (
      nome_completo, cpf_cnpj, telefone, email, endereco, observacoes
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

  try {
    const result = await pool.query(sql, [nome_completo, cpf_cnpj, telefone, email, endereco, observacoes]);
    res.status(201).json({
      message: 'Cliente criado com sucesso.',
      clienteId: result.rows[0].id
    });
  } catch (err) {
    console.error('Erro ao criar cliente:', err);
    res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
});

// ========================
// READ ALL - GET /clientes
// ========================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar clientes:', err);
    res.status(500).json({ error: 'Erro ao listar clientes.' });
  }
});

// ========================
// READ ONE - GET /clientes/:id
// ========================
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao obter cliente:', err);
    res.status(500).json({ error: 'Erro ao obter cliente.' });
  }
});

// ========================
// UPDATE - PUT /clientes/:id
// ========================
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_completo, cpf_cnpj, telefone, email, endereco, observacoes } = req.body;

  const sql = `
    UPDATE clientes
    SET nome_completo = $1,
        cpf_cnpj = $2,
        telefone = $3,
        email = $4,
        endereco = $5,
        observacoes = $6
    WHERE id = $7
  `;

  try {
    const result = await pool.query(sql, [nome_completo, cpf_cnpj, telefone, email, endereco, observacoes, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    res.json({ message: 'Cliente atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar cliente:', err);
    res.status(500).json({ error: 'Erro ao atualizar cliente.' });
  }
});

// ========================
// DELETE - DELETE /clientes/:id
// ========================
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    res.json({ message: 'Cliente deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar cliente:', err);
    res.status(500).json({ error: 'Erro ao deletar cliente.' });
  }
});

module.exports = router;
