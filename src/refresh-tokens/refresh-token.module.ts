import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { PostController } from 'src/post/post.controller';
import { UserController } from 'src/user/user.controller';
import { AuthUser } from 'src/provider/auth_user.provider';
import { databaseProviders } from 'src/provider/database.provider';
import { Mybatis } from 'src/provider/mybatis.provider';
import { PostRepository } from 'src/post/post.repository';
import { RefreshTokenRepository } from 'src/refresh-tokens/refresh-token.repository';
import { UserRepository } from 'src/user/user.repository';
import { PostService } from 'src/post/post.service';
import { RefreshTokenService } from 'src/refresh-tokens/refresh-token.service';
import { UserService } from 'src/user/user.service';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { PostCommentService } from 'src/post-comment.ts/post-comment.service';
import { PostCommentRepository } from '../post-comment.ts/post-comment.repository';
import { PostCommentModule } from '../post-comment.ts/post-comment.module';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UserService,
    UserRepository,
    RefreshTokenService,
    RefreshTokenRepository,
    AuthUser,
    Mybatis,
    ...databaseProviders,
  ],
  exports: [RefreshTokenService, RefreshTokenRepository],
})
export class RefreshTokenModule {}
