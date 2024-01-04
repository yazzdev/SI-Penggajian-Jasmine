require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/images', express.static('public/images'));
app.set('view engine', 'ejs');

app.use(router);

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({ message: `can't find ${req.url}` });
});

// 500 handler
app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

module.exports = app;