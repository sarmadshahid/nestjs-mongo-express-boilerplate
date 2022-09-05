import { MicroServicesConfig } from '@lib/common/config/config.interface';
import { ConfigService } from '@lib/common/config/config.service';
import { LoggerService } from '@lib/common/logger/logger.service';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  app.use(helmet());

  const logger = app.get(LoggerService);
  app.useLogger(logger);

  const configService = app.get(ConfigService);
  const microServicesConfig =
    configService.get<MicroServicesConfig>('microServices');

  const { users } = microServicesConfig;

  if (users?.swagger?.enabled) {
    const options = new DocumentBuilder()
      .setTitle(users?.swagger?.title || '')
      .setDescription(users?.swagger?.description || '')
      .setVersion(users?.swagger?.version || '')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(users?.swagger?.path, app, document);
  }
  logger.log(`Hey! I'm listening on port: ${users.port}`);
  await app.listen(users.port);
}
bootstrap();
