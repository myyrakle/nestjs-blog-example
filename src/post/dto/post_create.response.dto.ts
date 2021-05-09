import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class PostCreateResponseDto {
  @ApiProperty({ description: '성공여부', example: true })
  success: boolean;
  @ApiProperty({ description: '생성된 포스트 식별자', example: 1 })
  postId: bigint;
  @ApiProperty({ description: '메세지', example: '' })
  message?: string;
  @ApiProperty({ description: '오류', example: null })
  error?: any;
}
