import { Global, Logger, Module } from '@nestjs/common';

import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
import { MongooseConfigService } from './database/mongoose-config.service';
import { LoggerModule } from './logger/logger.module';

@Global()
@Module({
    providers: [
        CommonService,
        ConfigService,
        DatabaseService,
        Logger,
        MongooseConfigService,
    ],
    exports: [
        CommonService,
        ConfigService,
        DatabaseService,
        MongooseConfigService,
    ],
    imports: [ConfigModule, LoggerModule],
})
export class CommonModule {}
