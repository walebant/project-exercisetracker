const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = () => {
  mongoose.connect(process.env.DATABASE_URL);

  const database = mongoose.connection;

  database.on('error', error => {
    console.log(error);
  });

  database.once('connected', () => {
    console.log('Database Connected successfully 🚀');
  });
};

module.exports = connectDatabase;
