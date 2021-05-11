import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserRepository } from './user.repository';
import { AuthUser } from '../provider/auth_user.provider';
import { Mybatis } from '../provider/mybatis.provider';
import { databaseProviders } from '../provider/database.provider';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    AuthUser,
    Mybatis,
    ...databaseProviders,
  ],
})
export class UserModule {}
