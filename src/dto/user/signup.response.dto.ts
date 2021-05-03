import { Injectable } from '@nestjs/common';
import { ApiProduces, ApiProperty } from '@nestjs/swagger';
import { passwordHashing } from 'src/lib/password';
import { uuid } from 'uuidv4';

@Injectable()
export class SignupResponseDto {
  @ApiProperty({ description: '성공여부', example: true })
  success: boolean;
  @ApiProperty({ description: '이메일 중복여부', example: false })
  emailDuplicated: boolean;
  @ApiProperty({ description: '메세지', example: '' })
  message?: string;
  @ApiProperty({ description: '오류', example: null })
  error?: any;
}
