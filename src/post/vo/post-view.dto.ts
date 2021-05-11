import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DataType } from 'sequelize-typescript';
import { UserView } from 'src/user/dto/user-view.dto';

@Injectable()
export class PostView {
  @ApiProperty({ description: '식별자', example: 1 })
  id: bigint;
  @ApiProperty({ description: '사용자 식별자', example: 1 })
  userId: bigint;
  @ApiProperty({ description: '제목', example: '안녕하세요' })
  title: string;
  @ApiProperty({ description: '내용', example: '좋은 아침입니다.' })
  content: string;
  @ApiProperty({ description: '작성자 정보' })
  user: UserView;
}
