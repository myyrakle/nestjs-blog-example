import { Injectable, Scope } from '@nestjs/common';
import { UserView } from 'src/vo/user_view.dto';

@Injectable({ scope: Scope.REQUEST })
export class AuthUser {
  constructor() {
    this.authorized = false;
    this.user = null;
  }

  authorized: boolean;
  user: UserView;
}
