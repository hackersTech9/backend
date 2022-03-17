import { Router } from 'express'
import passport from '../controller/PassportLocal.js'

import  * as userController from '../controller/UsersController.js'

const UsersRoutes = new Router();

UsersRoutes.post('/login',  passport.authenticate('login', {failureRedirect: '/faillogin' }), userController.postLogin);

UsersRoutes.post('/signup', userController.mdwValidaUser, passport.authenticate('signup', {failureRedirect: '/failsignup' }), userController.postSignup)

UsersRoutes.put('/users/password', userController.mwdIsAuth, userController.putPassword)

UsersRoutes.get('/faillogin', userController.getfaillogin)

UsersRoutes.get('/failsignup', userController.getfailsignup)

UsersRoutes.get('/logout', userController.getlogout)

// UsersRoutes.post('/usuarios/role', userController.postRole)

// UsersRoutes.delete('/usuarios/role', userController.deleleRole)

export default UsersRoutes 



