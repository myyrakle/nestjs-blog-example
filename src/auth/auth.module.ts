import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RefreshTokenService } from 'src/refresh-tokens/refresh-token.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/user.repository';
import { RefreshTokenRepository } from '../refresh-tokens/refresh-token.repository';
import { RefreshTokenModule } from '../refresh-tokens/refresh-token.module';
import { AuthUser } from '../provider/auth_user.provider';
import { Mybatis } from '../provider/mybatis.provider';
import { databaseProviders } from '../provider/database.provider';

@Module({
  imports: [RefreshTokenModule],
  controllers: [AuthController],
  providers: [
    UserService,
    UserRepository,
    AuthUser,
    Mybatis,
    ...databaseProviders,
  ],
})
export class AuthModule {}
