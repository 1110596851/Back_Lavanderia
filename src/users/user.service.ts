import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/create-login.dto';
import { RegisterDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return user;
  }
// src/users/user.service.ts
async crearUsuarioPorDefecto() {
  const usuarioExistente = await this.usersRepository.findOne({
    where: { username: 'Administrador' },
  });

  if (!usuarioExistente) {
    const usuario = this.usersRepository.create({
      name: 'Usuario administrador Lavanderia',
      username: 'Administrador',
      document: '1234567892',
      password: await bcrypt.hash('adminLavanderia3', 10), // O usa tu lógica de hash
    });
    await this.usersRepository.save(usuario);
    console.log('✅ Usuario por defecto creado');
  } else {
    console.log('ℹ️ Usuario por defecto ya existe');
  }
}

  async login(loginDto: LoginDto): Promise<{ message: string }> {
    await this.validateUser(loginDto);
    return { message: 'Inicio de sesión exitoso' };
  }

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { username, password, name, document } = registerDto;

    const existingUser = await this.usersRepository.findOne({ where: [ { username }, { document } ] });
    if (existingUser) {
      throw new ConflictException('El usuario o documento ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      name,
      document,
    });

    await this.usersRepository.save(newUser);
    return { message: 'Usuario registrado con éxito' };
  }
}