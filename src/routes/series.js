import { Router } from 'express'
import passport from '../controller/PassportLocal.js'
import  * as seriesController from '../controller/SeriesController.js'


const SeriesRoutes = new Router();

SeriesRoutes.get('/', passport.authenticate('jwt', { session: false }), seriesController.getAll)


export default SeriesRoutes 
