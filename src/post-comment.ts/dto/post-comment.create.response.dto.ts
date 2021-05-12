import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class PostCommentCreateResponseDto {
  @ApiProperty({ description: '성공여부', example: true })
  success: boolean;
  @ApiProperty({ description: '생성된 댓글 식별자', example: 1 })
  postCommentId: bigint;
  @ApiProperty({ description: '메세지', example: '' })
  message?: string;
  @ApiProperty({ description: '오류', example: null })
  error?: any;
}
