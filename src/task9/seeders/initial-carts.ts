import { Seeder } from '@mikro-orm/seeder';
import { CartModel } from '../cart/cart.entity';
import { UserModel } from '../user/user.entity';
import { EntityManager } from '@mikro-orm/core';

export class InitialCartsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = await em.findOne(UserModel, { _id: '0fe36d16-49bc-4aab-a227-f84df899a6cb' });
    if (!user) {
      throw new Error('User not found');
    }
    em.create(CartModel, {
      user,
      isDeleted: false,
      _id: '1434fec6-cd85-420d-95c0-eee2301a971d',
    });
  }
}
