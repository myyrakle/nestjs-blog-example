import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class UserView {
  @ApiProperty({ description: '식별자', example: 1 })
  id?: bigint;
  @ApiProperty({ description: '이름', example: '김불가' })
  name: string;
  @ApiProperty({ description: '이메일', example: 'sssang97@naver.com' })
  email: string;
  @ApiProperty({ description: '패스워드', example: 'q1w2e3r4' })
  userType: string;
}
