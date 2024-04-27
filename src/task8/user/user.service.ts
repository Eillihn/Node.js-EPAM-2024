import { createUserEntity, findUserEntityByEmail, findUserEntityPassword, generateToken } from './user.repository';
import { LoginUserEntity, RegisterUserEntity, UserModel, UserPasswordModel, UserToken } from './user.entity';

export const createUser = (user: RegisterUserEntity) => createUserEntity(user);

export const loginUser = async (loginUser: LoginUserEntity): Promise<UserToken | undefined> => {
  const user: UserModel | null = await findUserEntityByEmail(loginUser.email);
  if (!user) {
    return;
  }
  const userPassword: UserPasswordModel | null = await findUserEntityPassword(user._id);
  if (userPassword?.password === loginUser.password) {
    return generateToken(loginUser);
  }
};
