import UsersApi from '../api/UsersApi.js'
import LivesApi from '../api/LivesApi.js';
import MusicApi from '../api/MusicApi.js';
import SeriesApi from '../api/SeriesApi.js';
import MoviesApi from '../api/MoviesApi.js';

import logger from '../logger.js'
import schema, {schPassword} from '../validations/users.js'

const users = new UsersApi();
const lives = new LivesApi();
const music = new MusicApi();
const series = new SeriesApi();
const movies = new MoviesApi();

export async function mdwSignUp(req, email, password, done) {

    try {
        const data = await schema.validateAsync(req.body)

        const user = await users.add(data);

        done(null, user);
    }
    catch (err) {
        logger.warn(err)
        done(null, false)
    }
}

export async function mdwLogin(email, password, done) {

    logger.info(`usuarios controller login email: ${email} `)

    try {
        const user = await users.login(email, password)
        return done(null, user);
    }
    catch (error) {
        logger.error(error);
        return done(null, false);
    }

};

export async function postLogin(req, res) {

    let vivo        = await lives.getAll(3);
    let musica      = await music.getAll(3);
    let serie      = await series.getAll(3);
    let peliculas   = await movies.getAll(3);

    let usuario = req.user;

    let objecto = {
        ...usuario,
        vivo,
        musica,
        serie,
        peliculas
    }
    res.status(200).json(objecto)
}

export function postSignup(req, res) {
    res.status(200).json(req.user)
}

export function getfaillogin(req, res) {
    res.status(401).json({ "descripcion": "email o contraseña incorrecta" })
}

export function getfailsignup(req, res) {

    res.status(400).json({ descripcion: req.error })
}

export function getlogout(req, res) {
    req.session.destroy(err => {
        if (!err) res.status(200).json({ 'status': 'ok' })
        else res.status(500).send({ status: 'Logout ERROR', body: err })
    })
}


export async function putPassword(req, res) {
    const user = req.user 
    let passwordCurrent
    let passwordNew

    try{
        const data = await schPassword.validateAsync(req.body)
        passwordCurrent = data.passwordCurrent
        passwordNew = data.passwordNew
    }
    catch(err){
        res.status(400).json(err)
    }

    try{
        const userObj= await users.changePassword(user, passwordCurrent, passwordNew);
        res.status(201).json(userObj.get()) 
    }
    catch(err){
        res.status(err.estado).json(err)
    }
}


export async function postRole(req, res) {
    const user = await users.AgregarRole(req.body.email, req.body.role);
    res.status(201).json(user.get())
}

export async function deleteRole(req, res) {
    const user = await users.EliminarRole(req.body.email, req.body.role);
    res.status(204).json(user.get())
}


export async function mdwValidaUser(req, res, next) {
    let data
    try {
        data = await schema.validateAsync(req.body)

    }
    catch (err) {
        logger.warn(`Error al validaciones esquema de usuarios`)
        return res.status(400).json({ descripcion: err.details })
    }

    try {

        if (await users.emailExists(data.email)) {
            return res.status(400).json({ descripcion: 'El email ya esta registrado' })
        }
    }
    catch (err) {
        logger.error(`Error al ejecutar validaciones de usuarios ${err}`)
        return res.status(500).json({ descripcion: err })
    }

    next();

}

export function mwdIsAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(401).json({ error: 'Acceso no autorizado' })
    }
  }
  