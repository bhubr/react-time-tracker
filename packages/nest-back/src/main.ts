import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose']
  });
  app.use(helmet());
  app.use(cookieParser());
  app.use(cors({ credentials: true }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
