import { Controller, Get } from '@nestjs/common';
import { Videojuego } from './videojuego.entity';
import { VideojuegosService } from './videojuegos.service';

@Controller('videojuegos')
export class VideojuegosController {
  constructor(private readonly videojuegosService: VideojuegosService) {}

  @Get()
  findAll(): Promise<Videojuego[]> {
    return this.videojuegosService.findAll();
  }
}