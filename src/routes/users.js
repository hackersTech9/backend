import { Router } from 'express'
import passport from '../controller/PassportLocal.js'
import {mwdIsAuth, validaUser} from '../controller/UsersController.js'

import { getfailloginController, getfailsignupController, getlogoutController, AgregarRole, EliminarRole, postLoginController, postSignupController, changePassword } from '../controller/UsersController.js'

const UsersRoutes = new Router();

UsersRoutes.post('/login',  passport.authenticate('login', {failureRedirect: '/faillogin' }), postLoginController);

UsersRoutes.post('/signup', validaUser, passport.authenticate('signup', {failureRedirect: '/failsignup' }), postSignupController)

UsersRoutes.put('/users/password', mwdIsAuth, changePassword)

UsersRoutes.get('/faillogin', getfailloginController)

UsersRoutes.get('/failsignup', getfailsignupController)

UsersRoutes.get('/logout', getlogoutController)

// UsersRoutes.post('/usuarios/role', AgregarRole)

// UsersRoutes.delete('/usuarios/role', EliminarRole)

export default UsersRoutes 



