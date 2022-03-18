import dotenv from 'dotenv';

import { ExtractJwt as ExtractJWT } from 'passport-jwt';

dotenv.config();

export const jwtOpts ={
  secretOrKey: process.env.SECRET ||'TOP_SECRET',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: process.env.JWT_IGNORE_EXPIRE || false,
  expireIn: parseInt(process.env.JWT_TIME_EXPIRE) || 3600,
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8000,
  MONGO_URL: process.env.MONGO_URL||'noURL',
  MONGO_DB: process.env.MONGO_BASE||'hackaton',
  MONGO_SESSION_URL: process.env.SESSION_URL||'noURL',
  SESSION_MAXAGE: process.env.SESSION_MAXAGE || 600000,
  SECRET:process.env.SECRET || 'Thebestteam9',

}