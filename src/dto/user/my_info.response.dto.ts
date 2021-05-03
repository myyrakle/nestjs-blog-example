import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { passwordHashing } from 'src/lib/password';
import { UserView } from 'src/vo/user_view.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class MyInfoResponseDto {
  @ApiProperty({
    description: '성공여부',
    example: true,
  })
  success: boolean;
  @ApiProperty({
    description: '유저 정보',
  })
  user: UserView;
  @ApiProperty({ description: '메세지', example: '' })
  message?: string;
  @ApiProperty({ description: '오류', example: null })
  error?: any;
}
