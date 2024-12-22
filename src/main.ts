import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
   // Configuración básica de CORS
   app.enableCors({
    origin: '*', // Permitir solo este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  });
  await app.listen(port);
}
bootstrap();
