import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UserModule } from './users/user.module';
import { Domicilio } from './domicilios/entities/domicilio.entity';
import { DomiciliosModule } from './domicilios/domicilios.module';
import { ContactoModule } from './contacto/contacto.module';
import { ServiceItem } from './domicilios/entities/servicio.entity';
import { Contacto } from './contacto/entities/contacto.entity';

@Module({
  imports: [UserModule, DomiciliosModule, ContactoModule, TypeOrmModule.forRoot({
      type: 'mariadb', // o 'postgres', 'sqlite', etc.
      host: '127.0.0.1',
      port: 3306,
      username: 'damaris',
      password: 'o11k07c99y',
      database: 'lavanderia',
      entities: [User, Domicilio, ServiceItem, Contacto],
      synchronize: true, // solo para desarrollo
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
