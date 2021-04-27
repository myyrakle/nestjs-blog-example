import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDeleteDto {
  constructor(id: bigint) {
    this.id = id;
  }

  id: bigint;
}
