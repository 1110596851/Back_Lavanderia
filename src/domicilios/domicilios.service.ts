import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Domicilio } from './entities/domicilio.entity';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';

@Injectable()
export class DomiciliosService {
  constructor(
    @InjectRepository(Domicilio)
    private domicilioRepo: Repository<Domicilio>,
  ) {}

  async create(createDto: CreateDomicilioDto): Promise<Domicilio> {
    const fecha = new Date(createDto.fecha);
    fecha.setHours(0, 0, 0, 0);
    const siguienteDia = new Date(fecha);
    siguienteDia.setDate(fecha.getDate() + 1);

    const domiciliosEnEsaFecha = await this.domicilioRepo.count({
      where: {
        fecha: Between(fecha, siguienteDia),
      },
    });

    if (domiciliosEnEsaFecha >= 2) {
      throw new BadRequestException('No hay disponibilidad para esa fecha. Solo se permiten 2 domicilios por día.');
    }

    const domicilio = this.domicilioRepo.create({
      ...createDto,
      fecha: new Date(createDto.fecha),
    });
    return this.domicilioRepo.save(domicilio);
  }

  // ... los demás métodos permanecen iguales



  async findAll(): Promise<Domicilio[]> {
    return this.domicilioRepo.find();
  }

  async findOne(id: number): Promise<Domicilio> {
    const dom = await this.domicilioRepo.findOne({ where: { id } });
    if (!dom) {
      throw new NotFoundException(`Domicilio con id ${id} no encontrado`);
    }
    return dom;
  }

  async update(id: number, updateDto: UpdateDomicilioDto): Promise<Domicilio> {
    const dom = await this.findOne(id);
    Object.assign(dom, updateDto);
    if (updateDto.fecha) dom.fecha = new Date(updateDto.fecha);
    return this.domicilioRepo.save(dom);
  }

  async remove(id: number): Promise<void> {
    const dom = await this.findOne(id);
    await this.domicilioRepo.remove(dom);
  }
}
