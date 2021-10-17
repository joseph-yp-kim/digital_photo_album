import { AlbumDao } from '../database/daos/AlbumDao';
import { UserDao } from '../database/daos/UserDao';
import { UserService } from './UserService';

const userDao = new UserDao();

const userService = new UserService();
userService.initialize({ userDao });

export { userService };
