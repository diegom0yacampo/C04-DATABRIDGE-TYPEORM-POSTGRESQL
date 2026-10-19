import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Videojuego } from './videojuego.entity';
import { VideojuegosController } from './videojuegos.controller';
import { VideojuegosService } from './videojuegos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Videojuego])],
  controllers: [VideojuegosController],
  providers: [VideojuegosService],
})
export class VideojuegosModule {}