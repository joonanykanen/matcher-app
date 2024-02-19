// config/passport.js, JN, 09.01.2024
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
};

passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload.id);

            if (!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }

        } catch (err) {
            return done(err, false);
        }
    })
);

module.exports = passport;

// eof
