import { addUserEntity, createUserEntity, findUserEntityByEmail, findUserEntityPassword, generateToken } from './user.repository';
import { LoginUserEntity, RegisterUserEntity, UserEntityDocument, UserModel, UserPasswordEntityDocument, UserToken } from './user.entity';

export const createUser = (user: RegisterUserEntity): Promise<UserEntityDocument> => createUserEntity(user);

export const loginUser = async (loginUser: LoginUserEntity): Promise<UserToken | undefined> => {
  const userEntity: UserEntityDocument | null = await findUserEntityByEmail(loginUser.email);
  if (!userEntity) {
    return;
  }
  const userEntityPassword: UserPasswordEntityDocument | null = await findUserEntityPassword(userEntity._id);
  if (userEntityPassword?.password === loginUser.password) {
    return generateToken(loginUser);
  }
};

export const initialUsers: RegisterUserEntity[] = [
  {
    _id: 'admin',
    role: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
  },
  {
    _id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
    role: 'author',
    email: 'author@gmail.com',
    password: 'author',
  },
  {
    _id: '1fe36d16-49bc-4aab-a227-f94df899a6cb',
    role: 'author',
    email: 'ann.jones@epam.com',
    password: 'password',
  },
];

export async function addInitialUsers(): Promise<void> {
  try {
    const existingUsers: UserEntityDocument[] = await UserModel.find();
    if (!existingUsers.length) {
      await Promise.all(
        initialUsers.map(async (userData: RegisterUserEntity): Promise<void> => {
          await addUserEntity(userData);
        }),
      );
      console.log('[Users] Initial data created successfully.');
    } else {
      console.log('[Users] Initial data already exists.');
    }
  } catch (error) {
    console.error('[Users] Error initializing data:', error);
  }
}
