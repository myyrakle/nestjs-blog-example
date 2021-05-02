import { Injectable } from '@nestjs/common';
import { DataType } from 'sequelize-typescript';
import { UserView } from './user_view.dto';

@Injectable()
export class PostView {
  id: bigint;
  userId: bigint;
  title: string;
  content: string;
  user: UserView;
}
