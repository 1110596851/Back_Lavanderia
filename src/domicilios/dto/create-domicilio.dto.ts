import { IsString, IsNotEmpty, IsDateString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceItemDto } from './create-servicio.dto';

export class CreateDomicilioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsDateString()
  fecha: string;

  @IsString()
  @IsOptional()
estado?: 'en curso' | 'finalizado';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceItemDto)
  servicios: ServiceItemDto[];
}