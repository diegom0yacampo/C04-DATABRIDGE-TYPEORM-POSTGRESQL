import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('videojuegos')
export class Videojuego {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  plataforma: string;

  @Column({ type: 'varchar', length: 50 })
  genero: string;

  @Column('decimal', { precision: 3, scale: 1 })
  puntuacion: number;
}