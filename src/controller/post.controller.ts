import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/lib/decorator';
import { AuthUser } from 'src/provider/auth_user.provider';
import { UserService } from 'src/service/user.service';
import { AppService } from '../service/app.service';
import { PostUpdateRequestDto } from 'src/dto/post/post_update.request.dto';
import { PostUpdateResponseDto } from 'src/dto/post/post_update.response.dto';
import { PostService } from 'src/service/post.service';
import { PostUpdateDto } from 'src/dto/post.update.dto';
import { PostCreateRequestDto } from 'src/dto/post/post_create.request.dto';
import { PostCreateResponseDto } from 'src/dto/post/post_create.response.dto';
import { DefaultResponseDto } from 'src/dto/default.response.dto';

@UseGuards(AuthGuard)
@Controller('/post')
export class PostController {
  constructor(
    private readonly _appService: AppService,
    private readonly postService: PostService,
    @Inject(REQUEST) private readonly authUser: AuthUser,
  ) {}

  @Roles(['USER'])
  @Post('/post')
  async createPost(
    @Body() body: PostCreateRequestDto,
  ): Promise<PostCreateResponseDto> {
    const result = await this.postService.createOne({
      ...body,
      userId: this.authUser?.user?.id,
    });

    return {
      success: true,
      postId: result.id,
      message: '성공',
      error: null,
    };
  }

  @Roles(['USER'])
  @Put('/post/:id')
  async updatePost(
    @Body() body: PostUpdateRequestDto,
    @Param('id') id: bigint,
  ): Promise<PostUpdateResponseDto> {
    const post = await this.postService.findOneById(id);

    if (
      this.authUser?.user.userType !== 'ADMIN' &&
      this.authUser?.user.id !== post.userId
    ) {
      throw new ForbiddenException({
        success: false,
        error: '',
        message: '권한 불충분',
      });
    }

    await this.postService.updateOne({
      ...body,
      userId: post.userId,
      id,
    });

    return {
      success: true,
      postId: id,
      message: '성공',
      error: null,
    };
  }

  @Roles(['USER'])
  @Delete('/post/:id')
  async deletePost(@Param('id') id: bigint): Promise<DefaultResponseDto> {
    const post = await this.postService.findOneById(id);

    if (
      this.authUser?.user.userType !== 'ADMIN' &&
      this.authUser?.user.id !== post.userId
    ) {
      throw new ForbiddenException({
        success: false,
        error: '',
        message: '권한 불충분',
      });
    }

    await this.postService.deleteOneById(id);

    return {
      success: true,
      message: '성공',
      error: null,
    };
  }
}
