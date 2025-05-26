import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ServiceItem } from './servicio.entity';
import { IsOptional } from 'class-validator';

@Entity('domicilios')
export class Domicilio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ default: 'en curso' })
  @IsOptional()
  estado: 'en curso' | 'finalizado';

  @OneToMany(() => ServiceItem, item => item.domicilio, { cascade: true, eager: true })
  servicios: ServiceItem[];
}
