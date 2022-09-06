import { DynamicModule, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';

import { createWinstonProviders } from './winston-logger.provider';

@Module({})
export class WinstonModule {
    public static forRoot(options?: LoggerOptions): DynamicModule {
        const providers = createWinstonProviders(options || {});

        return {
            module: WinstonModule,
            providers: providers,
            exports: providers,
        };
    }
}
