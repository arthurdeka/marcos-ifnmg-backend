// modificarDB.js (versão PostgreSQL)
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Cria a pool de conexão com PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // necessário para conectar no Neon
});

// Lê o arquivo init.sql
const initSqlPath = path.join(__dirname, 'init.sql');
const initSql = fs.readFileSync(initSqlPath, 'utf-8');

// Executa as queries do init.sql
(async () => {
  try {
    const client = await pool.connect();
    await client.query(initSql);
    console.log('Tabelas criadas/atualizadas com sucesso no PostgreSQL.');
    client.release();
  } catch (err) {
    console.error('Erro ao executar init.sql no PostgreSQL:', err);
  } finally {
    await pool.end();
  }
})();
