import { Injectable } from '@nestjs/common';
import { passwordHashing } from 'src/lib/password';
import { uuid } from 'uuidv4';

@Injectable()
export class LoginResponseDto {
  success: boolean;
  refreshToken: string;
  message?: string;
  error?: any;
}
