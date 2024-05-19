import { createUserEntity, findUserEntityByEmail } from './user.repository';
import { LoginUserEntity, RegisterUserEntity, UserModel, UserToken } from './user.entity';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

export const createUser = (user: RegisterUserEntity) => createUserEntity(user);

export const loginUser = async (loginUser: LoginUserEntity): Promise<UserToken | undefined> => {
  const user: UserModel | null = await findUserEntityByEmail(loginUser.email);
  if (!user) {
    return;
  }
  if (await bcrypt.compare(loginUser.password, user.password)) {
    return generateToken(user);
  }
};
