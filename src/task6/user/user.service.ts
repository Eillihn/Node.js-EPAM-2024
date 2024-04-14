import { createUserEntity, findUserEntityByEmail, findUserEntityPassword, generateToken } from './user.repository';
import { LoginUserEntity, RegisterUserEntity, UserEntity, UserPasswordEntity, UserToken } from './user.entity';

export const createUser = (user: RegisterUserEntity): UserEntity => {
  return createUserEntity(user);
};

export const loginUser = (loginUser: LoginUserEntity): UserToken | undefined => {
  const userEntity: UserEntity | undefined = findUserEntityByEmail(loginUser.email);
  if (!userEntity) {
    return;
  }
  const userEntityPassword: UserPasswordEntity | undefined = findUserEntityPassword(userEntity.id);
  if (userEntityPassword?.password === loginUser.password) {
    return generateToken(loginUser);
  }
};
