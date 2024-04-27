import { Seeder } from '@mikro-orm/seeder';
import { UserModel, UserPasswordModel } from '../user/user.entity';
import { EntityManager } from '@mikro-orm/core';

export class InitialUsersSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(UserModel, {
      role: 'admin',
      email: 'admin@gmail.com',
      _id: 'admin',
    });
    em.create(UserModel, {
      role: 'author',
      email: 'author@gmail.com',
      _id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
    });
    em.create(UserModel, {
      role: 'author',
      email: 'ann.jones@epam.com',
      _id: '1fe36d16-49bc-4aab-a227-f94df899a6cb',
    });
    const users = await em.getRepository(UserModel).findAll();

    em.create(UserPasswordModel, {
      password: 'admin',
      user: users[0],
      _id: 'admin',
    });

    em.create(UserPasswordModel, {
      password: 'DDQldls?kdpwthrth0fk',
      user: users[1],
      _id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
    });

    em.create(UserPasswordModel, {
      password: 'password',
      user: users[2],
      _id: '1fe36d16-49bc-4aab-a227-f94df899a6cb',
    });
  }
}
