import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
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
  providers: [ConfigService],
})
export class AppModule {}
