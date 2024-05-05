import { Seeder } from '@mikro-orm/seeder';
import { UserModel } from '../user/user.entity';
import { EntityManager } from '@mikro-orm/core';

export class InitialUsersSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = [
      {
        role: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        _id: 'admin',
      },
      {
        role: 'author',
        email: 'author@gmail.com',
        password: 'DDQldls?kdpwthrth0fk',
        _id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
      },
      {
        role: 'author',
        email: 'ann.jones@epam.com',
        password: 'password',
        _id: '1fe36d16-49bc-4aab-a227-f94df899a6cb',
      },
    ];
    users.forEach((user) => em.create(UserModel, user));
  }
}
