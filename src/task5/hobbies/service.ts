import { v4 as uuidv4 } from 'uuid';
import { users } from '../users/data';
import { hobbies, usersHobbies as initialUsersHobbies } from './data';
import { User } from '../users/model';
import Constants from '../constants';
import { HobbiesLinks, Hobby, UserHobby } from './model';

let usersHobbies: UserHobby[] = [...initialUsersHobbies];

const getUserHobbies = (id: string): UserHobby[] => {
  return usersHobbies.filter((userHobby: UserHobby): boolean => userHobby.userId === id);
};

export const getUserHobbiesIds = (id: string): string[] => {
  return getUserHobbies(id).map((userHobby: UserHobby) => userHobby.hobbyId);
};

export const getUserHobbiesNames = (id: string): string[] => {
  const userHobbiesIds: string[] = getUserHobbiesIds(id);
  return hobbies.filter((hobby: Hobby) => userHobbiesIds.includes(hobby.id)).map((hobby: Hobby) => hobby.name);
};

const getCreateHobbiesIds = (hobbiesNames: string[]): string[] => {
  return hobbiesNames.map((hobbyName: string) => {
    const hobby: Hobby | undefined = hobbies.find((hobby: Hobby): boolean => hobby.name === hobbyName);
    let id;
    if (!hobby) {
      id = uuidv4();
      hobbies.push({
        id,
        name: hobbyName,
      });
    } else {
      id = hobby!.id;
    }
    return id;
  });
};

export const patchUserHobbies = (id: string, hobbiesNames: string[]): boolean => {
  const userIndex: number = users.findIndex((user: User): boolean => user.id === id);
  const hasUser: boolean = userIndex > -1;
  if (hasUser) {
    const dataHobbiesIds: string[] = getCreateHobbiesIds(hobbiesNames);
    const userHobbiesIds: string[] = getUserHobbiesIds(id);
    const newDataHobbiesIds: string[] = dataHobbiesIds.filter((id: string) => !userHobbiesIds.includes(id));
    newDataHobbiesIds.forEach((newHobbyId: string) =>
      usersHobbies.push({
        userId: id,
        hobbyId: newHobbyId,
      }),
    );
  }
  return hasUser;
};

export const deleteAllUserHobbies = (userId: string) => {
  usersHobbies = usersHobbies.filter((userHobby: UserHobby) => userId !== userHobby.userId);
};

export const createHobbiesLinks = (id: string): HobbiesLinks => ({
  self: `${Constants.USERS_API_URL}${id}${Constants.USERS_HOBBIES_API_URL}`,
  user: `${Constants.USERS_API_URL}${id}`,
});
