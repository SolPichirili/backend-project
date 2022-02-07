const passport = require('passport');

const getIndex = (req, res) => {
    res.render('../views/pages/index.ejs', {
        email: req.user.email
    })
}

const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('../views/pages/login.ejs')
    }
}

const failLogin = (req, res) => {
    res.render('../views/pages/failLogin.ejs');
}

const logOut = (req, res) => {
    const email = req.user.email;
    req.session.destroy(err => {
        if (!err) {
            res.render('../views/pages/logOut.ejs', { email });
        } else {
            res.redirect('../views/pages/login.ejs');
        }
    });
}

const getRegister = (req, res) => {
    res.render('../views/pages/register.ejs');
}

const failRegister = (req, res) => {
    res.render('../views/pages/failRegister.ejs');
}

const redirectHome = (req, res) => {
    res.redirect('/');
}

const redirectLogin =  (req, res) => {
    res.redirect('/login')
}

module.exports = {
    getIndex,
    getLogin,
    failLogin,
    logOut,
    getRegister,
    failRegister,
    redirectHome,
    redirectLogin
}