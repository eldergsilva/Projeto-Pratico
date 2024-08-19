require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;
    if (!dbURI) {
      throw new Error('MONGODB_URI is not defined');
    }
    await mongoose.connect(dbURI);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
