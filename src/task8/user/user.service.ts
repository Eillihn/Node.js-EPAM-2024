import { createUserEntity, findUserEntityByEmail, generateToken } from './user.repository';
import { LoginUserEntity, RegisterUserEntity, UserModel, UserToken } from './user.entity';

export const createUser = (user: RegisterUserEntity) => createUserEntity(user);

export const loginUser = async (loginUser: LoginUserEntity): Promise<UserToken | undefined> => {
  const user: UserModel | null = await findUserEntityByEmail(loginUser.email);
  if (!user) {
    return;
  }
  if (user?.password === loginUser.password) {
    return generateToken(loginUser);
  }
};
