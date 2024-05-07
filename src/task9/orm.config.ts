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
  entities: ['./dist/task9/**/*.entity.js'],
  entitiesTs: ['./src/task9/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: './dist/task9/migrations',
    pathTs: './src/task9/migrations',
  },
  seeder: {
    path: './dist/task9/seeders',
    pathTs: './src/task9/seeders',
  },
  extensions: [Migrator, SeedManager],
};

export default options;
