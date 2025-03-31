// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do arquivo .db (armazena localmente)
const dbPath = path.resolve(__dirname, 'database.db');

// Inicializa conexão
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite com sucesso.');
  }
});


// Exporta o objeto db para uso em outros arquivos
module.exports = db;
