const express = require('express');
const mongoose= require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.DB_URI, {
    // dbName: process.env.DB_NAME,
    // user: process.env.DB_USER,
    // pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection= mongoose.connection;

connection.on('connected', () => {
    console.log('Mongoose connected to DB Cluster');
});

connection.on('error', (error) => {
    console.error(error.message);
});

connection.on('disconnected', () => {
    console.log('Mongoose Disconnected');
});
