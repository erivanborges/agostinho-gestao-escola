// test-db.js
const db = require('./db.config.js'); // Ajuste o caminho se necessário

async function testConnection() {
  try {
    // Exemplo comum para testar a conexão (depende do seu driver: pg, mysql2, etc.)
    // Se for um pool ou conexão do knex/sequelize/prisma, adapte o método de teste:
    const result = await db.query('SELECT 1 + 1 AS solution');
    console.log('Conexão bem-sucedida!', result.rows || result);
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  } finally {
    // Encerra o processo se houver método de fechar conexão
    process.exit();
  }
}

testConnection();