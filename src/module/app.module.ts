import { Module } from '@nestjs/common';
import { AuthController } from 'src/controller/auth.controller';
import { UserController } from 'src/controller/user.controller';
import { databaseProviders } from 'src/provider/database.provider';
import { RefreshTokenRepository } from 'src/repository/refresh_token.repository';
import { UserRepository } from 'src/repository/user.repository';
import { RefreshTokenService } from 'src/service/refresh_token.service';
import { UserService } from 'src/service/user.service';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, AuthController],
  providers: [
    AppService,
    UserService,
    UserRepository,
    RefreshTokenService,
    RefreshTokenRepository,
    ...databaseProviders,
  ],
})
export class AppModule {}
