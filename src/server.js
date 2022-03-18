import express, { json, urlencoded } from 'express'
import cors from 'cors';
import passport from './controller/PassportLocal.js'
import DefaultRoutes from "./routes/default.js"
import UsersRoutes from './routes/users.js'
import SeriesRoutes from './routes/series.js'
import MusicRoutes from './routes/music.js'
import MongoStore from 'connect-mongo'
import config from '../config/config.js'
// import session from 'express-session';
import LivesRoutes from './routes/lives.js';
import MoviesRoutes from './routes/movies.js';

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors());

/**************************************************************************************** */
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

// app.use(session({
//     /* ------------------------------------------------------------ */
//     /*           Persistencia por mongo atlas database             */
//     /* ------------------------------------------------------------ */
//     store: MongoStore.create({
//         //En Atlas connect App :  Make sure to change the node version to 2.2.12:
//         mongoUrl: config.MONGO_SESSION_URL,
//         mongoOptions: advancedOptions
//     }),
//     /* ------------------------------------------------------------ */

//     secret: config.SECRET,
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: config.SESSION_MAXAGE
//     }
// }))

/**************************************************************************************** */
app.use(passport.initialize());
// app.use(passport.session());
/**************************************************************************************** */

// rutas apiRestFull
app.use('/', UsersRoutes)
app.use('/series', SeriesRoutes)
app.use('/music', MusicRoutes)
app.use('/', LivesRoutes)
app.use('/', MoviesRoutes)

//rutas no encontrada
app.use('/*', DefaultRoutes)

export default app

