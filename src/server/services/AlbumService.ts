import { AlbumDao } from '../database/daos/AlbumDao';
import type { ID, Query } from '../database/daos/Dao';

export class AlbumService {
  private albumDao: AlbumDao;

  public initialize(params: { albumDao: AlbumDao }) {
    this.albumDao = params.albumDao;
  }

  public async getAlbumsByQuery(query: Query) {
    return this.albumDao.getAlbumsByQuery(query);
  }

  public async getAlbumsByUser(userId: ID) {
    return this.albumDao.getAlbumsByUser(userId);
  }
}
