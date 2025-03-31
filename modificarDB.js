// createTables.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Abre ou cria o BD local
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite com sucesso.');
  }
});

// Lê o arquivo init.sql
const initSqlPath = path.join(__dirname, 'init.sql');
const initSql = fs.readFileSync(initSqlPath, 'utf-8');

// Executa as queries do init.sql
db.exec(initSql, (err) => {
  if (err) {
    console.error('Erro ao executar init.sql:', err);
    return;
  }
  console.log('Tabelas criadas/atualizadas com sucesso.');
});

// Fecha o BD
db.close();
