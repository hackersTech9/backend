import MoviesDao from "../model/daos/MoviesDao.js";


export default class MoviesApi  {
    constructor() {
        this.moviesDao = new MoviesDao();

    }

    async getAll(limit) {
        return await this.moviesDao.getAll(limit);
    }


}