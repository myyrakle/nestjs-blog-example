import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PostView } from 'src/vo/post_view.dto';

@Injectable()
export class PostSelectResponseDto {
  @ApiProperty({ description: '성공여부', example: true })
  success: boolean;
  @ApiProperty({ description: '포스트 정보' })
  post: PostView;
  @ApiProperty({ description: '메세지', example: '' })
  message?: string;
  @ApiProperty({ description: '오류', example: null })
  error?: any;
}
