import UsersDao from '../model/daos/UsersDao.js';
import UserDto from '../model/dtos/UserDto.js';

import logger from '../logger.js'

export default class UsersApi {

    constructor() {
        this.usersDao = new UsersDao();
    }

    async emailExists(email) {
        try {
            await this.usersDao.getByEmail(email);
            return true;
        }
        catch (err) {
            if (err.estado == 404) return false;
            else throw err
        }
    }
    


    async get(email) {
        const data = await this.usersDao.getByEmail(email);
        return new UserDto(data);
    }
    

    async login(email, password){
        try{
            const usuario = await this.get(email)

            if (!usuario.isValidPassword(password)) 
                return false
            else
                return usuario.get();
        }
        catch(err){
             logger.error(`fallo el login de mail error:${err}`)             
        }

    }

    async add(data){
        try {

            const usuario = new UserDto(data)
            usuario._id = await this.usersDao.add(usuario)

            logger.info(`Registro Ok `);
    
            return usuario.get();
        }
        catch (err) {
            logger.error(`Error in Saving user: ${err}`);
            throw (err);
        }
    }

    //modify the password
    async changePassword(user, passwordCurrent, passwordNew){
        try {
            //create user object with date of datebase
            const userBD = await this.usersDao.getByEmail(user.email);
            const userObj = new UserDto(userBD);

            //validate email and password
            if (userObj.isValidPassword(passwordCurrent)) {
                //If you validate OK, modify password 
                userObj.setNewPassword(passwordNew)
                //save to database
                const userNewBD = await this.usersDao.update(userObj)     
                const userNewObj = new UserDto(userNewBD);
                return userNewObj;
            }else{
                logger.error(`Error validation email and password`);
                throw new CustomError(400, `Error validation email and password`)
            }            
        }
        catch (err) {
            logger.error(`Error in Saving user: ${err}`);
            throw (err);
        }
    }
    

    async AgregarRole(email, role)
    {
        try{
            const dto = await this.usersDao.addRole(email, role)
            return new UserDto(dto);
        }
        catch(err)
        {
            logger.error(`Error in Saving user: ${err}`);
            throw (err);
        }
    }
    
    async EliminarRole(email, role)
    {
        try{
            const dto = await this.usersDao.delRole(email, role)
            return new UserDto(dto);
        }
        catch(err)
        {
            logger.error(`Error in Saving user: ${err}`);
            throw (err);
        }
    }



}


