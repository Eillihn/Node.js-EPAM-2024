import {
  RegisterUserEntity,
  createUserEntity,
  UserEntity,
  findUserEntityByEmail,
  LoginUserEntity,
  findUserEntityPassword,
  UserPasswordEntity,
  generateToken,
  UserToken,
} from './user.repository';

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
