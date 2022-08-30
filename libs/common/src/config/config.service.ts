import { Injectable } from '@nestjs/common';
import * as Convict from 'convict';
import * as dotenv from 'dotenv';
import { Config } from './config.interface';
import { Schema } from './config.schema';

@Injectable()
export class ConfigService {
  config: Convict.Config<Config>;

  constructor() {
    this.config = Convict(Schema);
    const dotEnvFile = dotenv.config().parsed;
    if (dotEnvFile) {
      this.config.load(dotenv.config().parsed);
    }
    this.config.validate({ allowed: 'warn' });
  }

  get<K>(configName: string) {
    return this.config.get<K>(configName) as K;
  }

  getBaseConfigObject() {
    return this.config;
  }
}
