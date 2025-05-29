import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('LiYajie-OS')
    .setDescription('LiYajie-OS 接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('__swagger__', app, document, {
    jsonDocumentUrl: '__swagger__/json',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 启用class-transformer
      whitelist: true, // 忽略DTO中未定义的字段
    }),
  );

  await app.listen(process.env.PORT ?? 3011);
}
bootstrap();
