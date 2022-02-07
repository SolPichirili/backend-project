const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');
const logger = require('../../utils/winston');
const { isValidPassword, createHash } = require('../../utils/bCrypt');
const { send } = require('../../utils/nodemailer');

const loginStrategy = new LocalStrategy((username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            logger.error('User not found');
            return done(null, false);
        }

        if (!isValidPassword(user, password)) {
            logger.error('Invalid Password');
            return done(null, false);
        }

        return done(null, user)
    })
});

const registerStrategy = new LocalStrategy({ passReqToCallback: true },
    (req, username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
            if (err) {
                logger.error(`Error ${err}`);
                return done(err);
            }

            if (user) {
                logger.error('User already exists');
                return done(null, false);
            }

            const newUser = {
                username: username,
                password: createHash(password),
                email: req.body.username,
                name: req.body.name,
                address: req.body.address,
                age: req.body.age,
                tel: req.body.tel,
                img: req.body.photo
            }

            if (newUser.tel.includes('+549')) {
                User.create(newUser, (err, userCreated) => {
                    if (err) {
                        logger.error(`Error ${err}`);
                        return done(err);
                    }

                    logger.info('Successful registration');
                    send(`Nuevo registro de ${userCreated}`);
                    return done(null, userCreated);
                });
            } else {
                logger.error('Error with Phone');
                return done(null, false);
            }
        })
    });

const serializeUser = (user, cb) => {
    cb(null, user);
};

const deserializeUser = (obj, cb) => {
    cb(null, obj);
}


module.exports = {
    loginStrategy,
    registerStrategy,
    serializeUser,
    deserializeUser
}