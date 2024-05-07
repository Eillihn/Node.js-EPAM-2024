import { UserModel, UserToken } from '../user/user.entity';
import jwt from 'jsonwebtoken';
import envConfig from './envConfig';

export default (user: UserModel): UserToken => {
  return {
    token: jwt.sign({ user_id: user._id, email: user.email, role: user.role }, envConfig.JWT_SECRET, { expiresIn: envConfig.JWT_EXPIRATION }),
  };
};
