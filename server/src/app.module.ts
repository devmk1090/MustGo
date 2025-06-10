import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mustgo-server',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, //개발에서만 true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
