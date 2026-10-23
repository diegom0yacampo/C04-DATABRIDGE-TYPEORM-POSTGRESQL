import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mascotas')
export class Mascota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  raza: string;

  @Column()
  edad: number;

  @Column()
  ciudad: string;

  @Column({ default: 'MEDIO' })
  nivelEnergia: string;
}