import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expressMidlleware } from 'middleware/express.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(expressMidlleware)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
