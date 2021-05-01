import { Injectable } from '@nestjs/common';
import { IsEmail } from 'class-validator';
import { passwordHashing } from 'src/lib/password';
import { uuid } from 'uuidv4';

@Injectable()
export class CheckEmailRequestDto {
  @IsEmail()
  email: string;
}
