import 'dotenv/config';
import { resolve } from 'path';
import { DataSource } from 'typeorm';

const migrationsDir = resolve(
  __dirname,
  '..',
  'database',
  'migrations',
  '*{.ts,.js}',
);

const entitiesDir = resolve(
  __dirname,
  '..',
  'modules',
  '**',
  'entities',
  '*.model{.ts,.js}',
);

export const dataSource = new DataSource({
  type: 'postgres',
  port: parseInt(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsRun: true,
  entities: [entitiesDir],
  migrations: [migrationsDir],
  synchronize: false,
  logging: process.env.NODE_ENV === 'local',
  uuidExtension: 'uuid-ossp',
  migrationsTableName: 'migrations_typeorm',
});
