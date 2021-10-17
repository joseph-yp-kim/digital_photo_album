import { AlbumDao } from '../database/daos/AlbumDao';

export class AlbumService {
  private albumDao: AlbumDao;

  public initialize(params: { albumDao: AlbumDao }) {
    this.albumDao = params.albumDao;
  }
}
