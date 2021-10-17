import { Dao, DaoOptions, ID } from './dao';
import UserModel from '../models/user';

type User = {
  id: ID;
  email: string;
  username: string;
  password: string;
};

export class UserDao extends Dao<User> {
  constructor(daoOptions?: DaoOptions<User>) {
    super(UserModel, daoOptions);
  }

  public async getUsers() {
    return this.get({});
  }
}
