import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose']
  });
  app.use(helmet());
  app.use(cookieParser());
  app.use(cors({ credentials: true }));
  app.use(morgan('dev'));
  await app.listen(process.env.PORT || 5050);
}
bootstrap();
