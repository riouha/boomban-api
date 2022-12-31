import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = app.get<ConfigService>(ConfigService).get('app.port');
  await app.listen(port, () => {
    console.log(`listening to port ${port} ...`);
  });
}

bootstrap();
