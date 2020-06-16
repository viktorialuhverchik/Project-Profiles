import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Entities } from "./entities";

@Module({
  imports: [
      UserModule,
      AuthModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'rootpass',
        database: 'nest_db',
        entities: Entities,
        synchronize: true,
        autoLoadEntities: true
      })
  ]
})
export class AppModule {}
