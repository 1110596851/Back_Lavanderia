import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomiciliosService } from './domicilios.service';
import { DomiciliosController } from './domicilios.controller';
import { Domicilio } from './entities/domicilio.entity';
import { ServiceItem } from './entities/servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Domicilio, ServiceItem])],
  controllers: [DomiciliosController],
  providers: [DomiciliosService],
})
export class DomiciliosModule {}
