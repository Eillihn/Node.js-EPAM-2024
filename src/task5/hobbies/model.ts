export interface Hobby {
  id: string;
  name: string;
}

export interface UserHobby {
  userId: string;
  hobbyId: string;
}
export interface HobbiesLinks {
  self: string;
  user: string;
}

export interface PatchHobbies {
  hobbies: string[];
}
