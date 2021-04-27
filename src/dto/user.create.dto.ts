import { Injectable } from '@nestjs/common';
import { passwordHashing } from 'src/lib/password';
import { uuid } from 'uuidv4';

@Injectable()
export class UserCreateDto {
  constructor(value: {
    name: string;
    email: string;
    password: string;
    userType: string;
  }) {
    this.name = value.name;
    this.email = value.email;
    this.userType = value.userType;
    this.passwordSalt = uuid();
    this.password = passwordHashing(value.password, this.passwordSalt);
  }

  name: string;
  email: string;
  passwordSalt: string;
  password: string;
  userType: string;
}
