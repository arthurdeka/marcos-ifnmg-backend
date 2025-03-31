// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const db = require('./database');
const clientesRoutes = require('./rotas/clientes');
const eventosRoutes = require('./rotas/eventos');
const usersRoutes = require('./rotas/users');
const authRoutes = require('./rotas/autorizacao'); 

app.use(cors()); // <--- essa linha habilita CORS para qualquer origem

app.use(express.json());

// rotas gerais
app.use('/clientes', clientesRoutes);
app.use('/eventos', eventosRoutes);
app.use('/users', usersRoutes);

// Rota de autenticação
app.use('/', authRoutes); 

// Rota inicial de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo à API da Agência de Eventos!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
