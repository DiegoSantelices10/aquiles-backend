import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  // Configuración básica de CORS
  app.enableCors({
    origin: '*', // Permitir cualquier origen (ajustar según necesidades)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  });

  // Usar validación global de DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Middleware global para manejar excepciones y dar respuestas formateadas
  app.useGlobalFilters({
    catch(exception: HttpException, host) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      const errorResponse = {
        success: false,
        statusCode: status,
        message: exception.message || 'Error inesperado',
      };

      response.status(status).json(errorResponse);
    },
  });

  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
