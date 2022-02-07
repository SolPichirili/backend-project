const passport = require('passport');
const {loginStrategy, registerStrategy, serializeUser, deserializeUser} = require('../passport/LocalStrategy');

passport.use('login', loginStrategy);

passport.use('register', registerStrategy);

passport.serializeUser(serializeUser);

passport.deserializeUser(deserializeUser);

module.exports = passport;