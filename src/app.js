// src/app.js
const express = require('express');
const indexRouter = require('./routes/index'); // Import router

const app = express();

// Middleware untuk membaca body dari request
app.use(express.json()); // Untuk body tipe application/json
app.use(express.urlencoded({ extended: true })); // **PENTING** untuk membaca data dari form HTML

// Routing utama
app.use('/', indexRouter);

module.exports = app;