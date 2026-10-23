import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantesModule } from './restaurantes/restaurantes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'databridge_e04',
      autoLoadEntities: true,
      synchronize: true,
    }),
    RestaurantesModule,
  ],
})
export class AppModule {}