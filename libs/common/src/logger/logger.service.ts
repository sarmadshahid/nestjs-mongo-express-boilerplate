import { Injectable } from '@nestjs/common';
import { WinstonLoggerService } from './winston/winston-logger.service';

@Injectable()
export class LoggerService extends WinstonLoggerService {}
