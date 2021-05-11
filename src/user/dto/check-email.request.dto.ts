import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { passwordHashing } from 'src/lib/password';
import { uuid } from 'uuidv4';

@Injectable()
export class CheckEmailRequestDto {
  @ApiProperty({
    description: '이메일',
    example: 'sssang97@naver.com',
    required: true,
  })
  @IsEmail()
  email: string;
}
