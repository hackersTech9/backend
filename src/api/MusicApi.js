import MusicDao from '../model/daos/MusicDao.js';

export default class MusicApi {

    constructor() {
        this.musicDao = new MusicDao();
    }

    async getAll(limit) {
        const musicObj = await this.musicDao.getAll(limit);
        return musicObj;
    }   

}
