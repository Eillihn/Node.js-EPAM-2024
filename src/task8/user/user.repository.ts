import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { LoginUserEntity, RegisterUserEntity, UserToken, UserModel } from './user.entity';
import { DI } from '../server';

const JWT_SECRET: string = 'user_jwt_secret';
const JWT_EXPIRATION: string = '1d';

export const findUserEntityById = (userId: string) => DI.userRepository.findOne(userId);

export const findUserEntityByEmail = (userEmail: string) => DI.userRepository.findOne({ email: userEmail });

export const createUserEntity = async (registerUserEntity: RegisterUserEntity): Promise<UserModel> => {
  const user: UserModel = new UserModel(registerUserEntity.role, registerUserEntity.email, registerUserEntity.password, uuidv4());
  await DI.em.persistAndFlush(user);
  return user;
};

export const addUserEntity = async (userEntity: RegisterUserEntity): Promise<void> => {
  const user: UserModel = new UserModel(userEntity.role, userEntity.email, userEntity.password, userEntity._id);
  await DI.em.persistAndFlush(user);
};

export const generateToken = (user: LoginUserEntity): UserToken => {
  return { token: jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION }) };
};
