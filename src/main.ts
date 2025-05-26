import { webcrypto } from 'crypto';
// Si no existe globalThis.crypto, lo asignamos al webcrypto de Node
if (!(globalThis as any).crypto) {
  (globalThis as any).crypto = webcrypto;
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './users/user.service';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HABILITAR CORS
  app.enableCors({
    origin: ['http://localhost:8080','http://localhost:5173'], // URL de tu frontend
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ignora propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // lanza error si se manda algo no permitido
    transform: true, // convierte tipos (ej: string -> Date, number, etc)
  }));

   const userService = app.get(AuthService);
  await userService.crearUsuarioPorDefecto();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
