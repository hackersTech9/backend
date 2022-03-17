import LivesDao from '../model/daos/LivesDao.js';
//import SeriesDto from '../model/dtos/SeriesDto.js';

export default class LivesApi {

    constructor() {
        this.livesDao = new LivesDao();
    }

    async getAll(limit) {
        const livesObj = await this.livesDao.getAll(limit);
        return livesObj;
    }   

    async getByObjectId(id) {
        console.log(id)
        const livesObj = await this.livesDao.getByObjectId(id);
        return livesObj;
    }   

}


