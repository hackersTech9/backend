
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { mdwSignUp, mdwLogin } from './UsersController.js'

import UsersApi from '../api/UsersApi.js'
const users = new UsersApi();



passport.use('signup', new LocalStrategy({usernameField: 'email', passwordField: 'password', passReqToCallback: true }, mdwSignUp))

passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password'}, mdwLogin));

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
  try {
    const usuario = await users.get(email)
    done(null, usuario);
  }
  catch (err) {
    logger.error(err);
    return done(null, false);
  }
});

export default passport;