import { Module } from '@nestjs/common';
import { PostController } from 'src/post/post.controller';
import { AuthUser } from 'src/provider/auth_user.provider';
import { databaseProviders } from 'src/provider/database.provider';
import { Mybatis } from 'src/provider/mybatis.provider';
import { PostService } from 'src/post/post.service';
import { PostModule } from './post/post.module';
import { PostCommentModule } from './post-comment.ts/post-comment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { RefreshTokenService } from './refresh-tokens/refresh-token.service';
import { UserRepository } from './user/user.repository';
import { RefreshTokenRepository } from './refresh-tokens/refresh-token.repository';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PostModule, PostCommentModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, AuthUser, Mybatis, ...databaseProviders],
})
export class AppModule {}
