import { Controller, Post, Body, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { CreateContactoDto } from './dto/create-contacto.dto';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateContactoDto) {
    return this.contactoService.create(dto);
  }

  @Get()
  findAll() {
    return this.contactoService.findAll();
  }
}
