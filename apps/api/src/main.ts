import { MicroServicesConfig } from '@lib/common/config/config.interface';
import { ConfigService } from '@lib/common/config/config.service';
import { LoggerService } from '@lib/common/logger/logger.service';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { ApiModule } from './api.module';

async function bootstrap() {
    const app = await NestFactory.create(ApiModule);

    app.use(helmet());

    const logger = app.get(LoggerService);
    app.useLogger(logger);

    const configService = app.get(ConfigService);
    const microServicesConfig =
        configService.get<MicroServicesConfig>('microServices');

    const { api } = microServicesConfig;

    if (api?.swagger?.enabled) {
        const options = new DocumentBuilder()
            .setTitle(api?.swagger?.title || '')
            .setDescription(api?.swagger?.description || '')
            .setVersion(api?.swagger?.version || '')
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(api?.swagger?.path, app, document);
    }
    logger.log(`Hey! I'm listening on port: ${api.port}`);
    await app.listen(api.port);
}
bootstrap();
