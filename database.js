// database.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões com Neon
  },
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados PostgreSQL:', err.stack);
  } else {
    console.log('Conectado ao banco de dados PostgreSQL com sucesso.');
    release();
  }
});

module.exports = pool;
