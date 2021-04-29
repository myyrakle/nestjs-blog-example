import { Injectable } from '@nestjs/common';
import { IsEmail } from 'class-validator';

@Injectable()
export class LoginRequestDto {
  @IsEmail()
  email: string;
  password: string;
}
