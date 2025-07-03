import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
