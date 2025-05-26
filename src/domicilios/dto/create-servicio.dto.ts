import { IsString, IsNumber, Min, IsIn } from 'class-validator';

export class ServiceItemDto {
  @IsString()
  tipo: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(1)
  cantidad: number;
}