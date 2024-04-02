import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export interface UserEntity {
  id: string;
  role: string;
  email: string;
}

export interface UserPasswordEntity {
  userId: string;
  password: string;
}

export interface UserToken {
  token: string;
}

export interface LoginUserEntity {
  email: string;
  password: string;
}

export type RegisterUserEntity = {
  email: string;
  password: string;
  role: string;
};

const JWT_SECRET = 'user_jwt_secret';
const JWT_EXPIRATION = '1d';

const user: UserEntity = {
  id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  role: 'author',
  email: 'author@gmail.com',
};
const admin: UserEntity = {
  id: 'admin',
  role: 'admin',
  email: 'admin@gmail.com',
};

const passwords: UserPasswordEntity[] = [
  {
    userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
    password: 'qwe',
  },
  {
    userId: 'admin',
    password: 'admin',
  },
  {
    userId: '1fe36d16-49bc-4aab-a227-f94df899a6cb',
    password: 'DDQldls?kdpw0fk',
  },
];

const users: UserEntity[] = [
  admin,
  user,
  {
    id: '1fe36d16-49bc-4aab-a227-f94df899a6cb',
    role: 'author',
    email: 'ann.jones@epam.com',
  },
];

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
