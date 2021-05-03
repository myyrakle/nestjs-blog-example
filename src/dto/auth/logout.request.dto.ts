import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { passwordHashing } from 'src/lib/password';
import { uuid } from 'uuidv4';

@Injectable()
export class LogoutRequestDto {
  @ApiProperty({
    description: '저장중이었던 리프레시 토큰',
    example: 'asdweqdgnu1udc23hnedxg23hnxgkejw',
    required: true,
  })
  refreshToken: string;
}
