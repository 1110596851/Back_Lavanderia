import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
   @IsNotEmpty()
  name: string;

  @IsString()
   @IsNotEmpty()
  document: string;

  @IsString()
   @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
   @IsNotEmpty()
  password: string;
}