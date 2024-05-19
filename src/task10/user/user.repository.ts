import { v4 as uuidv4 } from 'uuid';
import { RegisterUserEntity, UserModel } from './user.entity';
import { DI } from '../server';
import bcrypt from 'bcryptjs';

export const findUserEntityById = (userId: string) => DI.userRepository.findOne(userId);

export const findUserEntityByEmail = (userEmail: string) => DI.userRepository.findOne({ email: userEmail });

export const createUserEntity = async (registerUserEntity: RegisterUserEntity): Promise<UserModel> => {
  const encryptedPassword: string = await bcrypt.hash(registerUserEntity.password, 10);
  const user: UserModel = new UserModel(registerUserEntity.role, registerUserEntity.email, encryptedPassword, uuidv4());
  await DI.em.persistAndFlush(user);
  return user;
};

export const addUserEntity = async (userEntity: RegisterUserEntity): Promise<void> => {
  const user: UserModel = new UserModel(userEntity.role, userEntity.email, userEntity.password, userEntity._id);
  await DI.em.persistAndFlush(user);
};
