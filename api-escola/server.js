// Importa o framework Express para criar o servidor web
const express = require('express');

// Cria uma instância da aplicação Express
const app = express();

// Define a porta em que o servidor irá escutar as requisições
const port = 3000;

const alunoRoutes = require('./src/routes/alunoRoutes');

app.use(express.json());

app.use('/alunos', alunoRoutes);

// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log('Servidor executando em http://localhost:3000');
});




