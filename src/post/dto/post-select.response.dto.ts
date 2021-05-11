import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PostCommentView } from 'src/post-comment.ts/vo/post-comment-view.dto';
import { PostView } from 'src/post/vo/post-view.dto';

@Injectable()
export class PostSelectResponseDto {
  @ApiProperty({ description: '성공여부', example: true })
  success: boolean;
  @ApiProperty({ description: '포스트 정보' })
  post: PostView;
  @ApiProperty({ description: '포스트 댓글' })
  comment: PostCommentView[];
  @ApiProperty({ description: '메세지', example: '' })
  message?: string;
  @ApiProperty({ description: '오류', example: null })
  error?: any;
}
