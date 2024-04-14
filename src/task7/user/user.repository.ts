import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import {
  LoginUserEntity,
  RegisterUserEntity,
  UserToken,
  UserModel,
  UserPasswordModel,
  UserEntityDocument,
  UserPasswordEntityDocument,
} from './user.entity';

const JWT_SECRET = 'user_jwt_secret';
const JWT_EXPIRATION = '1d';

export const findUserEntityById = (userId: string): Promise<UserEntityDocument | null> => UserModel.findById(userId);

export const findUserEntityByEmail = (userEmail: string): Promise<UserEntityDocument | null> => UserModel.findOne({ email: userEmail });

export const findUserEntityPassword = (userId: string): Promise<UserPasswordEntityDocument | null> => UserPasswordModel.findOne({ userId });

export const createUserEntity = async (registerUserEntity: RegisterUserEntity): Promise<UserEntityDocument> => {
  const user: UserEntityDocument = new UserModel({
    _id: uuidv4(),
    ...registerUserEntity,
  });
  const savedUser: UserEntityDocument = await user.save();
  const password: UserPasswordEntityDocument = new UserPasswordModel({
    _id: uuidv4(),
    userId: savedUser._id,
    password: registerUserEntity.password,
  });
  await password.save();
  return savedUser;
};

export const addUserEntity = async (userEntity: RegisterUserEntity): Promise<void> => {
  const user: UserEntityDocument = new UserModel(userEntity);
  await user.save();

  const userPassword: UserPasswordEntityDocument = new UserPasswordModel({
    userId: user._id,
    ...userEntity,
  });
  await userPassword.save();
};

export const generateToken = (user: LoginUserEntity): UserToken => {
  return { token: jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION }) };
};
