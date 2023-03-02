const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const connectDatabase = require('./database');

const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

connectDatabase();

app.use('/', routes);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
