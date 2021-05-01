import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { passwordHashing } from 'src/lib/password';
import { UserView } from 'src/vo/user_view.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class MyInfoResponseDto {
  success: boolean;
  user: UserView;
  message?: string;
  error?: any;
}
