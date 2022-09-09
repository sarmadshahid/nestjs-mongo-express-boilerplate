import { Global, Logger, Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
import { MongooseConfigService } from './database/mongoose-config.service';
import { LoggerModule } from './logger/logger.module';

@Global()
@Module({
    providers: [
        AuthService,
        CommonService,
        ConfigService,
        DatabaseService,
        Logger,
        MongooseConfigService,
    ],
    exports: [
        AuthService,
        CommonService,
        ConfigService,
        DatabaseService,
        MongooseConfigService,
    ],
    imports: [AuthModule, ConfigModule, LoggerModule],
})
export class CommonModule {}
