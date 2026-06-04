import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//import { AppLogger } from './app.logger';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule, {
    //logger: new AppLogger()
  });

  ////////////////////middle ware
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`Actors API`)
    .addServer(process.env.SWAGGER_SERVER_PREFIX || '')
    .setDescription(`This API manages an actor (Customers, Agents), and its assets (e.g. emails, phoneNumbers, etc.)`)
    .setVersion(`0.0.2`)
    .addTag('Actors API', 'Manage the life cycle of the Actor, including details and assets')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, documentFactory);

  ////////////////////start server
  const port = process.env.APP_PORT || 8080;
  await app.listen(port, '0.0.0.0', () => {
    logger.log(`Express web server started: http://localhost:${port}`);
  });
}

bootstrap();