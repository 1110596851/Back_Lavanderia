import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Domicilio } from './domicilio.entity';

@Entity('service_items')
export class ServiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('int')
  cantidad: number;

  @ManyToOne(() => Domicilio, domicilio => domicilio.servicios, { onDelete: 'CASCADE' })
  domicilio: Domicilio;
}