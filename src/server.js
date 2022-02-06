require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const compression = require('compression');
const router = require('./routers/index');

const server = express();

server.use(compression());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

server.set('view engine', 'ejs');

server.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}));

server.use(passport.initialize());
server.use(passport.session())

server.use(router);

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if (err) {
            console.error('Error Mongo');
        }
});


module.exports = server;
