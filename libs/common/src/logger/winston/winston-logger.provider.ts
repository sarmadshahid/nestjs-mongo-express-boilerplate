import { Provider } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { WINSTON_MODULE_OPTIONS } from './winston-logger.constants';
import { WinstonLoggerService } from './winston-logger.service';

export function createWinstonProviders(loggerOpts: LoggerOptions): Provider[] {
  return [
    {
      provide: WINSTON_MODULE_OPTIONS,
      useValue: loggerOpts,
    },
    WinstonLoggerService,
  ];
}
