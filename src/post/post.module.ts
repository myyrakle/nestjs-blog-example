import { Module } from '@nestjs/common';
import { AuthController } from 'src/controller/auth.controller';
import { PostController } from 'src/post/post.controller';
import { UserController } from 'src/controller/user.controller';
import { AuthUser } from 'src/provider/auth_user.provider';
import { databaseProviders } from 'src/provider/database.provider';
import { Mybatis } from 'src/provider/mybatis.provider';
import { PostRepository } from 'src/post/post.repository';
import { PostCommentRepository } from 'src/post_comment.ts/post_comment.repository';
import { RefreshTokenRepository } from 'src/repository/refresh_token.repository';
import { UserRepository } from 'src/repository/user.repository';
import { PostService } from 'src/post/post.service';
import { RefreshTokenService } from 'src/service/refresh_token.service';
import { UserService } from 'src/service/user.service';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { PostCommentService } from 'src/post_comment.ts/post_comment.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [
    UserService,
    PostService,
    PostCommentService,
    UserRepository,
    PostRepository,
    PostCommentRepository,
    AuthUser,
    Mybatis,
    ...databaseProviders,
  ],
})
export class PostModule {}
