import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CheckEmailRequestDto } from 'src/dto/user/check_email.request.dto';
import { CheckEmailResponseDto } from 'src/dto/user/check_email.response.dto';
import { MyInfoResponseDto } from 'src/dto/user/my_info.response.dto';
import { SignupRequestDto } from 'src/dto/user/signup.request.dto';
import { SignupResponseDto } from 'src/dto/user/signup.response.dto';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/lib/decorator';
import { AuthUser } from 'src/provider/auth_user.provider';
import { UserService } from 'src/service/user.service';
import { AppService } from '../service/app.service';
import { DefaultResponseDto } from 'src/dto/default.response.dto';
import { PostCreateRequestDto } from 'src/dto/post/post_create.request.dto';
import { PostCreateResponseDto } from 'src/dto/post/post_create.response.dto';
import { PostService } from 'src/service/post.service';

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
}
