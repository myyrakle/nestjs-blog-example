import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

@Injectable()
export class LoginRequestDto {
  @IsEmail()
  @ApiProperty({
    description: '이메일(아이디)',
    example: 'sssang97@naver.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    description: '패스워드',
    example: 'q1w2e3r4',
    required: true,
  })
  password: string;
}
