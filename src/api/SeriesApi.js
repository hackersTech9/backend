import SeriesDao from '../model/daos/SeriesDao.js';

export default class SeriesApi {

    constructor() {
        this.seriesDao = new SeriesDao();
    }

    async getAll(limit) {
        const seriesObj = await this.seriesDao.getAll(limit);
        return seriesObj;
    }   

}


