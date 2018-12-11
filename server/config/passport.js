const passport = require('passport')
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy   = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const config = require('../../nuxt.config.js')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email', session: false, passReqToCallback: true }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase().trim() }, (err, user) => {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { msg: `Email ${email} not found.` })
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) {
        return done(null, false, { msg: 'Invalid email or password.' })
      }
      const payload = {
        sub: user._id
      };

      // create a token string
      const token = jwt.sign(payload, config.env.secret);
      const data = {
        name: user.name,
        _id: user._id,
        email: user.email
      };

      return done(null, token, data);

    })

  })
}))

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : config.env.secret
    },
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user)
            })
            .catch(err => {
                return cb(err)
            });
    }
))