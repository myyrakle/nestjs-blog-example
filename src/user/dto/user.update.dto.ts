import { Injectable } from '@nestjs/common';
import { passwordHashing } from 'src/lib/password';
import { uuid } from 'uuidv4';

@Injectable()
export class UserUpdateDto {
  constructor(
    id: bigint,
    value: {
      name: string;
      email: string;
      password: string;
      userType: string;
    },
  ) {
    this.id = id;
    this.name = value.name;
    this.email = value.email;
    this.userType = value.userType;
    this.passwordSalt = uuid();
    this.password = passwordHashing(value.password, this.passwordSalt);
  }

  id: bigint;
  name: string;
  email: string;
  passwordSalt: string;
  password: string;
  userType: string;
}
