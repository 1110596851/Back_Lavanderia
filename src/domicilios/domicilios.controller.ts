import { Controller, Get, Post, Body, Param, Patch, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DomiciliosService } from './domicilios.service';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';

@Controller('domicilios')
export class DomiciliosController {
  constructor(private readonly domiciliosService: DomiciliosService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() createDto: CreateDomicilioDto) {
    return this.domiciliosService.create(createDto);
  }

  @Get()
  findAll() {
    return this.domiciliosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domiciliosService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(@Param('id') id: string, @Body() updateDto: UpdateDomicilioDto) {
    return this.domiciliosService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domiciliosService.remove(+id);
  }
}
