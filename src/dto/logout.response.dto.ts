import { Injectable } from '@nestjs/common';
import { passwordHashing } from 'src/lib/password';
import { uuid } from 'uuidv4';

@Injectable()
export class LogoutResponseDto {
  success: boolean;
  message?: string;
  error?: any;
}
