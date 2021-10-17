import { Dao, DaoOptions, ID } from './dao';
import AlbumModel from '../models/album';

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
}
