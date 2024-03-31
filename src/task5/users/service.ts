import { v4 as uuidv4 } from 'uuid';
import Constants from '../constants';
import { users } from './data';
import { PostUser, User, UserLinks } from './model';
import { deleteAllUserHobbies } from '../hobbies/service';

export const createUser = (data: PostUser): User => {
  const id: string = uuidv4();

  return {
    id,
    ...data,
  };
};

export const createUserLinks = (id: string): UserLinks => ({
  self: `${Constants.USERS_API_URL}${id}`,
  hobbies: `${Constants.USERS_API_URL}${id}${Constants.USERS_HOBBIES_API_URL}`,
});

export const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex((user: User): boolean => user.id === id);
  const hasUser = userIndex > -1;
  if (hasUser) {
    users.splice(userIndex, 1);
    deleteAllUserHobbies(id);
  }
  return hasUser;
};

export const getUser = (id: string): User | undefined => {
  return users.find((user: User): boolean => user.id === id);
};

export const addUser = (user: User): void => {
  users.push(user);
};

export const getAllUsers = (): User[] => {
  return users;
};

export const isUserExist = (id: string): boolean => {
  const userIndex: number = users.findIndex((user: User): boolean => user.id === id);
  return userIndex > -1;
};
