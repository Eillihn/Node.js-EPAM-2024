import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { LoginUserEntity, RegisterUserEntity, UserToken, UserModel, UserPasswordModel } from './user.entity';
import { DI } from '../server';

const JWT_SECRET: string = 'user_jwt_secret';
const JWT_EXPIRATION: string = '1d';

export const findUserEntityById = (userId: string) => DI.userRepository.findOne(userId);

export const findUserEntityByEmail = (userEmail: string) => DI.userRepository.findOne({ email: userEmail });

export const findUserEntityPassword = async (userId: string): Promise<UserPasswordModel | null> => {
  const user: UserModel | null = await findUserEntityById(userId);
  return DI.userPasswordRepository.findOne({ user });
};

export const createUserEntity = async (registerUserEntity: RegisterUserEntity): Promise<UserModel> => {
  const user: UserModel = new UserModel(registerUserEntity.role, registerUserEntity.email, uuidv4());
  const password: UserPasswordModel = new UserPasswordModel(registerUserEntity.password, user, uuidv4());
  DI.em.persist(user);
  DI.em.persist(password);
  await DI.em.flush();
  return user;
};

export const addUserEntity = async (userEntity: RegisterUserEntity): Promise<void> => {
  const user: UserModel = new UserModel(userEntity.role, userEntity.email, userEntity._id);
  DI.em.persist(user);
  const password: UserPasswordModel = new UserPasswordModel(userEntity.password, user, userEntity._id);
  DI.em.persist(password);
  await DI.em.flush();
};

export const generateToken = (user: LoginUserEntity): UserToken => {
  return { token: jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION }) };
};
