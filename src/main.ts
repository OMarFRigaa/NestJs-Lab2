import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('lab2 example')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('lab2')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-lab2', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
