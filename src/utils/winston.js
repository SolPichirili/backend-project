const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({ level: 'verbose' }),
        new winston.transports.Console({ level: 'warn' }),
        new winston.transports.File({filename: 'logs/error.log', level: 'error'})
    ]
});

module.exports = logger;