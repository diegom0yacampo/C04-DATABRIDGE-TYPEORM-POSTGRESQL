import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeliculasModule } from './peliculas/peliculas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'databridge_e02',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PeliculasModule,
  ],
})
export class AppModule {}