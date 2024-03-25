export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserLinks {
  self: string;
  hobbies: string;
}

export type PostUser = Pick<User, 'name' | 'email'>;
