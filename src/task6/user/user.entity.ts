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

export const passwords: UserPasswordEntity[] = [
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

export const users: UserEntity[] = [
  admin,
  user,
  {
    id: '1fe36d16-49bc-4aab-a227-f94df899a6cb',
    role: 'author',
    email: 'ann.jones@epam.com',
  },
];
