import './boot';
import '@config';
import { env } from '@utils';

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  staging: {
    client: env('DB_DRIVER'),
    connection: {
      host: env('DB_HOST'),
      port: env('DB_PORT'),
      database: env('DB_DATABASE'),
      user: env('DB_USERNAME'),
      password: env('DB_PASSWORD')
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  production: {
    client: env('DB_DRIVER'),
    connection: {
      host: env('DB_HOST'),
      port: env('DB_PORT'),
      database: env('DB_DATABASE'),
      user: env('DB_USERNAME'),
      password: env('DB_PASSWORD'),
      ssl: true
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './database/seeds/production'
    }
  }
};
