import { Dao } from './dao';
import AlbumModel from '../models/album';

import type { DaoOptions, ID, Query } from './dao';

type Album = {
  id: ID;
  user: ID;
  title: string;
  start: Date;
  end: Date;
};

export class AlbumDao extends Dao<Album> {
  constructor(daoOptions?: DaoOptions<Album>) {
    super(AlbumModel, daoOptions);
  }

  public async getAlbumsByQuery(query: Query) {
    return this.get(query);
  }

  public async getAlbumsByUser(userId: ID) {
    return this.get({ user: userId });
  }
}
