import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import envConfig from './utils/envConfig';

const options: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  dbName: envConfig.MIKRO_ORM_DB_NAME,
  user: envConfig.MIKRO_ORM_USER,
  password: envConfig.MIKRO_ORM_PASSWORD,
  debug: true,
  entities: ['./dist/task10/**/*.entity.js'],
  migrations: {
    path: './dist/task10/migrations',
  },
  seeder: {
    path: './dist/task10/seeders',
  },
  extensions: [Migrator, SeedManager],
  metadataCache: {
    options: { cacheDir: './dist/task10/temp' },
  },
};

export default options;
