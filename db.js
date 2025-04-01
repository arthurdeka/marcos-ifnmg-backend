const { Pool } = require('pg');
require('dotenv').config(); // carrega .env localmente (em dev)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necessário para o Neon
  },
});

module.exports = pool;
