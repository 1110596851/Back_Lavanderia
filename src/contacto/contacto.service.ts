import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacto } from './entities/contacto.entity';
import { CreateContactoDto } from './dto/create-contacto.dto';

@Injectable()
export class ContactoService {
  constructor(
    @InjectRepository(Contacto)
    private readonly contactoRepo: Repository<Contacto>,
  ) {}

  async create(createDto: CreateContactoDto): Promise<Contacto> {
    const nuevo = this.contactoRepo.create(createDto);
    return this.contactoRepo.save(nuevo);
  }

  findAll(): Promise<Contacto[]> {
    return this.contactoRepo.find({ order: { creadoEn: 'DESC' } });
  }
}
