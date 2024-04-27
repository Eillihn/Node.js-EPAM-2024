import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import envConfig from './utils/envConfig';

const options: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  dbName: envConfig.MIKRO_ORM_DB_NAME,
  user: envConfig.MIKRO_ORM_USER,
  password: envConfig.MIKRO_ORM_PASSWORD,
  debug: true,
  entities: ['./dist/task8/**/*.entity.js'],
  entitiesTs: ['./src/task8/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: './dist/task8/migrations',
  },
  seeder: {
    path: './dist/task8/seeders',
  },
  extensions: [Migrator, SeedManager],
};

export default options;
