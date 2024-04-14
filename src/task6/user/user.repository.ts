import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { users, passwords, LoginUserEntity, RegisterUserEntity, UserEntity, UserPasswordEntity, UserToken } from './user.entity';

const JWT_SECRET = 'user_jwt_secret';
const JWT_EXPIRATION = '1d';

export const findUserEntityById = (userId: string) => users.find((user: UserEntity): boolean => user.id === userId);

export const findUserEntityByEmail = (userEmail: string): UserEntity | undefined => {
  return users.find((user: UserEntity): boolean => userEmail === user.email);
};

export const findUserEntityPassword = (userId: string): UserPasswordEntity | undefined => {
  return passwords.find((userPassword: UserPasswordEntity): boolean => userPassword.userId === userId);
};

export const createUserEntity = (user: RegisterUserEntity): UserEntity => {
  const userEntity: UserEntity = {
    id: uuidv4(),
    ...user,
  };
  users.push(userEntity);
  passwords.push({
    userId: userEntity.id,
    password: user.password,
  });
  return userEntity;
};

export const generateToken = (user: LoginUserEntity): UserToken => {
  return { token: jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION }) };
};
