import { Injectable } from '@nestjs/common';

@Injectable()
export class UserView {
  id: bigint;
  name: string;
  email: string;
  userType: string;
}
