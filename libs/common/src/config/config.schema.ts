import * as Convict from 'convict';

import { Config } from './config.interface';

export const Schema: Convict.Schema<Config> = {
  logging: {
    basePath: {
      doc: 'application logging base path',
      format: String,
      default: `/var/logs/`,
      env: 'LOGGING_BASEPATH',
    },
    fileName: {
      doc: 'application logging file name',
      format: String,
      default: `app`,
      env: 'LOGGING_FILE_NAME',
    },
  },
  database: {
    host: {
      doc: 'database host',
      format: String,
      default: 'db',
      env: 'DATABASE_HOST',
    },
    port: {
      doc: 'database port',
      format: 'port',
      default: 27017,
      env: 'DATABASE_PORT',
    },
    username: {
      doc: 'database username',
      format: String,
      default: 'guest',
      env: 'DATABASE_USERNAME',
    },
    password: {
      doc: 'database password',
      format: String,
      default: 'guest',
      env: 'DATABASE_PASSWORD',
    },
    name: {
      doc: 'database name',
      format: String,
      default: 'users',
      env: 'DATABASE_NAME',
    },
  },
  microServices: {
    users: {
      port: {
        doc: 'users port to bind',
        format: 'port',
        default: 3000,
        env: 'USERS_SERVER_PORT',
      },
      swagger: {
        enabled: {
          doc: 'users swagger enable',
          format: 'Boolean',
          default: true,
          env: 'USERS_SWAGGER_ENABLED',
        },
        title: {
          doc: 'users swagger title',
          format: String,
          default: 'Users',
        },
        description: {
          doc: 'users swagger description',
          format: String,
          default: 'rest api endpoints for users',
        },
        version: {
          doc: 'users swagger version',
          format: String,
          default: '1.0',
        },
        path: {
          doc: 'users swagger url path',
          format: String,
          default: 'api',
        },
      },
    },
  },
  cors: {
    enabled: {
      doc: 'cors enabled',
      format: 'Boolean',
      default: true,
      env: 'CORS_ENABLED',
    },
  },
};
