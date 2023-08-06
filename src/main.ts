import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Bookmark API')
    .setDescription('Manage bookmarks')
    .setVersion("1.0").build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Makes validation pipes global
  app.useGlobalPipes(
    new ValidationPipe(
      // Removes elements not defined in dto from req body
      { whitelist: true },
    ),
  );
  await app.listen(3333);
}
bootstrap();
