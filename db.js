const { Pool } = require('pg');

// substitua pela sua connection string real do Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necessário para Neon
  },
});

module.exports = pool;
