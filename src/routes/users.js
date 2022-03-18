import { Router } from 'express'
import passport from '../controller/PassportLocal.js'

import * as userController from '../controller/UsersController.js'

const UsersRoutes = new Router();

UsersRoutes.post('/login',
    passport.authenticate('login', { session: false, failureRedirect: '/faillogin' }),
    userController.postLogin);

UsersRoutes.post('/signup',
    userController.mdwValidaUser,
    passport.authenticate('signup', { session: false, failureRedirect: '/failsignup' }),
    userController.postLogin);


UsersRoutes.put('/users/password', passport.authenticate('jwt', { session: false }), userController.putPassword)

UsersRoutes.get('/faillogin', userController.getfaillogin)

UsersRoutes.get('/failsignup', userController.getfailsignup)

UsersRoutes.get('/logout', userController.getlogout)


export default UsersRoutes



