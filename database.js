const mongoose = require('mongoose');

const DATABASE_URL =
  'mongodb+srv://walebant:EWbqU4KqtJceEx3K@cluster0.z2ftgtl.mongodb.net/test';

const connectDatabase = () => {
  mongoose.connect(DATABASE_URL);

  const database = mongoose.connection;

  database.on('error', error => {
    console.log(error);
  });

  database.once('connected', () => {
    console.log('Database Connected successfully 🚀');
  });
};

module.exports = connectDatabase;
