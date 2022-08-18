const {getNombre} = require('../handlers/socket');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const classU = require('../lib/class_usuarios');
const classUsers = new classU;
const {hash, unhash} = require('../utils/bcrypt');

passport.use('login', new LocalStrategy({
    passReqToCallback: true
}, async function (req, username, password, next) {
    const user = await classUsers.getUser(username);

    if (user) {
        const isPassValid = unhash(password, user.password);

        if (isPassValid) {
            getNombre(user.username);
            return next(null, user);
        } else {
            return next(null, false);
        };

    } else {
        return next(null, false);
    };
}));

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
  }, async function(req, username, password, next) {

    let usuario = {
        username: username,
        password: hash(password)
    };

    const user = await classUsers.register(usuario);

    if (user) {
        return next(null, user);
    } else {
        return next(null, false);
    };
}));



passport.serializeUser(function(user, next) {
    next(null, user.username);
});

passport.deserializeUser(function(username, next) {
    let usuario = classUsers.getUser(username);
    next(null, usuario);
});