import { Module } from '@nestjs/common';

import { LoggerService } from './logger.service';
import { WinstonModule } from './winston/winston-logger.module';

@Module({
    imports: [WinstonModule.forRoot()],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {}
