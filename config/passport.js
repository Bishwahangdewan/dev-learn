const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secret = require("./keys").secretorpublic;
const mongoose = require("mongoose");
const User = mongoose.model('user');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport => {

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
            .catch(err => console.log(err))
    }))
}