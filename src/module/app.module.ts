import { Module } from '@nestjs/common';
import { AuthController } from 'src/controller/auth.controller';
import { PostController } from 'src/controller/post.controller';
import { UserController } from 'src/controller/user.controller';
import { AuthUser } from 'src/provider/auth_user.provider';
import { databaseProviders } from 'src/provider/database.provider';
import { Mybatis } from 'src/provider/mybatis.provider';
import { PostRepository } from 'src/repository/post.repository';
import { RefreshTokenRepository } from 'src/repository/refresh_token.repository';
import { UserRepository } from 'src/repository/user.repository';
import { PostService } from 'src/service/post.service';
import { RefreshTokenService } from 'src/service/refresh_token.service';
import { UserService } from 'src/service/user.service';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, AuthController, PostController],
  providers: [
    AppService,
    UserService,
    RefreshTokenService,
    PostService,
    UserRepository,
    RefreshTokenRepository,
    PostRepository,
    AuthUser,
    Mybatis,
    ...databaseProviders,
  ],
})
export class AppModule {}
