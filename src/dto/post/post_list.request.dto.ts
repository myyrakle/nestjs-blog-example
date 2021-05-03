import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Default } from 'sequelize-typescript';
import { PostView } from 'src/vo/post_view.dto';

@Injectable()
export class PostListRequestDto {
  @ApiProperty({ description: '페이지', example: 1, required: false })
  page?: number;
  @ApiProperty({ description: '페이지 크기', example: 10, required: false })
  limit?: number;
}
