import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PostView } from 'src/post/vo/post-view.dto';

@Injectable()
export class PostListResponseDto {
  @ApiProperty({ description: '성공여부', example: true })
  success: boolean;
  @ApiProperty({ description: '게시글 목록' })
  list: PostView[];
  @ApiProperty({ description: '성공여부', example: 3 })
  totalCount: bigint;
  @ApiProperty({ description: '메세지', example: '' })
  message?: string;
  @ApiProperty({ description: '오류', example: null })
  error?: any;
}
