require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function testConnection() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  } finally {
    await client.close();
  }
}

testConnection();
