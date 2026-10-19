import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideojuegosModule } from './videojuegos/videojuegos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'databridge_e01',
      autoLoadEntities: true,
      synchronize: true,
    }),
    VideojuegosModule,
  ],
})
export class AppModule {}