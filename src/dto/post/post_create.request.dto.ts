import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class PostCreateRequestDto {
  @ApiProperty({ description: '제목', example: '안녕하세요' })
  title: string;
  @ApiProperty({ description: '내용', example: '좋은 아침입니다.' })
  content: string;
}
