import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './users/user.module';
import { DomiciliosModule } from './domicilios/domicilios.module';
import { ContactoModule } from './contacto/contacto.module';

import { User } from './users/entities/user.entity';
import { Domicilio } from './domicilios/entities/domicilio.entity';
import { ServiceItem } from './domicilios/entities/servicio.entity';
import { Contacto } from './contacto/entities/contacto.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT', '3306')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Domicilio, ServiceItem, Contacto],
        synchronize: true, // ⚠️ solo para desarrollo
      }),
    }),
    UserModule,
    DomiciliosModule,
    ContactoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

