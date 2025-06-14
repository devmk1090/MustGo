import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';

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
    PostModule,
  ],
  providers: [],
})
export class AppModule {}
