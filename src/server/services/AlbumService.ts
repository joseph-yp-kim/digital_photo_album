import { AlbumDao } from '../database/daos/AlbumDao';
import type { ID } from '../database/daos/Dao';

export class AlbumService {
  private albumDao: AlbumDao;

  public initialize(params: { albumDao: AlbumDao }) {
    this.albumDao = params.albumDao;
  }

  public async getAlbumsByUser(userId: ID) {
    return this.albumDao.getAlbumsByUser(userId);
  }
}
