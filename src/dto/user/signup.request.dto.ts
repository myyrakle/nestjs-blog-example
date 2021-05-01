import { Injectable } from '@nestjs/common';
import { passwordHashing } from 'src/lib/password';
import { uuid } from 'uuidv4';

@Injectable()
export class SignupRequestDto {
  name: string;
  email: string;
  password: string;
}
