const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Para login
passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'},
    function (username, password, cb) {
        console.log(username, password);
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        if (username == 'admin' && password == 'admin123') {
            return cb(null, { id: 1, username: username }, { message: 'Login correcto' });
        } else {
            return cb(null, false, { message: 'Usuario/Contraseña incorrectos' });
        }
    }
));

// Para middleware de recursos protegidos
passport.use(new JWTStrategy({ jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), secretOrKey: 'contrasena_segura'},
    function (jwtPayload, cb) {
        return cb(null, jwtPayload);
    }
));