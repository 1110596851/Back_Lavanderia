import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateContactoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;
}
