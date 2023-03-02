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

app.listen(1000, () => {
  console.log('Your app is listening on port 1000');
});
