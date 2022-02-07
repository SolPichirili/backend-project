const express = require('express');
const compression = require('compression');
const sessionMongo = require('./services/session');
const passport = require('./services/passport/passport');

const router = require('./routers/index');

const server = express();

server.use(compression());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

server.set('view engine', 'ejs');

server.use(sessionMongo);

server.use(passport.initialize());
server.use(passport.session())

server.use(router);

module.exports = server;
