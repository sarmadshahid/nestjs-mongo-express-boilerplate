import { Inject, LoggerService } from '@nestjs/common';
import {
  createLogger,
  format,
  Logger,
  LoggerOptions,
  transports,
} from 'winston';
import { LoggingConfig } from '../../config/config.interface';
import { ConfigService } from '../../config/config.service';
import { WINSTON_MODULE_OPTIONS } from './winston-logger.constants';

export class WinstonLoggerService implements LoggerService {
  private context?: string;
  private readonly logger: Logger;
  constructor(
    @Inject(WINSTON_MODULE_OPTIONS)
    private readonly options: LoggerOptions,
    private readonly configService: ConfigService
  ) {
    if (options && Object.values(options).length) {
      this.logger = createLogger(options);
    } else {
      const loggingConfig = this.configService.get<LoggingConfig>('logging');
      this.logger = createLogger({
        level: 'info',
        transports: [
          new transports.Console({
            format: format.combine(
              format.timestamp(),
              format.colorize(),
              format.simple()
            )
          }),
          new transports.File({ 
            filename: `${loggingConfig.basePath}${loggingConfig.fileName}.log`,
            format: format.combine(
              format.timestamp(),
              format.json(),
            ) 
          })
        ],
      });
    }
  }

  public setContext(context: string) {
    this.context = context;
  }

  public log(message: any, context?: string): any {
    context = context || this.context;
    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;
      return this.logger.info(this.stringify(msg), { context, ...meta });
    }
    return this.logger.info(message, { context });
  }

  public error(message: any, trace?: string, context?: string): any {
    context = context || this.context;

    if (message instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      return this.logger.error(msg, {
        context,
        stack: [trace || message.stack],
        ...meta,
      });
    }

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.error(this.stringify(msg), {
        context,
        stack: [trace],
        ...meta,
      });
    }

    return this.logger.error(message, { context, stack: [trace] });
  }

  public warn(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.warn(this.stringify(msg), { context, ...meta });
    }

    return this.logger.warn(message, { context });
  }

  public debug?(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.debug(this.stringify(msg), { context, ...meta });
    }

    return this.logger.debug(message, { context });
  }

  public verbose?(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.verbose(this.stringify(msg), { context, ...meta });
    }

    return this.logger.verbose(message, { context });
  }

  private stringify(message: any): string {
    return typeof message === 'string'
      ? message
      : JSON.stringify(message, undefined, 2);
  }
}
