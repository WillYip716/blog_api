//passport.js

const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.use(new LocalStrategy(
    function (nameentered, passwordentered, cb) {        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT 
        return User.findOne({name:nameentered, password:passwordentered})
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect username or password.'});
               } 
               console.log("user is " + user);              
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.SECRET
},
function (jwtPayload, cb) {
    console.log("payload is " +jwtPayload.id);
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));