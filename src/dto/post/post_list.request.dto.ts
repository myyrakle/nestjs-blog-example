import { Injectable } from '@nestjs/common';
import { Default } from 'sequelize-typescript';
import { PostView } from 'src/vo/post_view.dto';

@Injectable()
export class PostListRequestDto {
  page?: number;
  limit?: number;
}
