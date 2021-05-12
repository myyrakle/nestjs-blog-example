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
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/lib/decorator';
import { AuthUser } from 'src/provider/auth_user.provider';
import { AppService } from '../app.service';
import { PostUpdateRequestDto } from 'src/post/dto/post-update.request.dto';
import { PostService } from 'src/post/post.service';
import { PostCreateRequestDto } from 'src/post/dto/post-create.request.dto';
import { PostCreateResponseDto } from 'src/post/dto/post-create.response.dto';
import { DefaultResponseDto } from 'src/lib/dto/default.response.dto';
import { PostSelectResponseDto } from 'src/post/dto/post-select.response.dto';
import { PostListRequestDto } from 'src/post/dto/post-list.request.dto';
import { PostListResponseDto } from 'src/post/dto/post-list.response.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostCommentService } from 'src/post-comment.ts/post-comment.service';
import { PostCommentCreateDto } from '../post-comment.ts/dto/post-comment.create.dto';
import { PostCommentCreateResponseDto } from '../post-comment.ts/dto/post-comment.create.response.dto';
import { PostCommentCreateRequestDto } from '../post-comment.ts/dto/post-comment.create.request.dto';

@UseGuards(AuthGuard)
@ApiTags('post')
@Controller('/post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postCommentService: PostCommentService,
    @Inject(REQUEST) private readonly authUser: AuthUser,
  ) {}

  @Post('/post')
  @Roles(['USER'])
  @ApiOperation({ summary: '게시글 작성' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: PostCreateResponseDto,
  })
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

  @Put('/post/:id')
  @Roles(['USER'])
  @ApiOperation({ summary: '게시글 수정' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: DefaultResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: '식별자',
    type: 'integer',
    example: 1,
    required: true,
  })
  async updatePost(
    @Body() body: PostUpdateRequestDto,
    @Param('id') id: bigint,
  ): Promise<DefaultResponseDto> {
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
      message: '성공',
      error: null,
    };
  }

  @Delete('/post/:id')
  @Roles(['USER'])
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: DefaultResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: '식별자',
    type: 'integer',
    example: 1,
    required: true,
  })
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

  @Get('/post/:id')
  @ApiOperation({ summary: '게시글 조회' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: PostSelectResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: '식별자',
    type: 'integer',
    example: 1,
    required: true,
  })
  async selectPost(@Param('id') id: bigint): Promise<PostSelectResponseDto> {
    const post = await this.postService.findOneById(id);
    const comment = await this.postCommentService.findList(id);

    return {
      success: true,
      post,
      comment,
      message: '성공',
      error: null,
    };
  }

  @Get('/post-list')
  @ApiOperation({ summary: '게시글 목록조회' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: PostListResponseDto,
  })
  @ApiQuery({
    name: 'page',
    description: '페이지',
    type: 'integer',
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: '페이지 크기',
    type: 'integer',
    example: 1,
    required: false,
  })
  async selectPostList(
    @Query() query: PostListRequestDto,
  ): Promise<PostListResponseDto> {
    const limit = query.limit ?? 10;
    const page = query.page ?? 1;
    const offset = (page - 1) * limit;

    const [list, totalCount] = await this.postService.findList({
      limit,
      offset,
    });

    return {
      success: true,
      list,
      totalCount,
      message: '성공',
      error: null,
    };
  }

  @Post('/comment')
  @Roles(['USER'])
  @ApiOperation({ summary: '게시글에 댓글 작성' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: PostCommentCreateResponseDto,
  })
  async createPostComment(
    @Body() body: PostCommentCreateRequestDto,
  ): Promise<PostCommentCreateResponseDto> {
    const result = await this.postCommentService.createOne({
      ...body,
      userId: this.authUser?.user?.id,
    });

    return {
      success: true,
      postCommentId: result.id,
      message: '성공',
      error: null,
    };
  }

  @Get('test')
  async test() {
    return { data: await this.postService.test() };
  }
}
