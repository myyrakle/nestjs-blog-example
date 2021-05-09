import { Injectable } from '@nestjs/common';
import { Default } from 'sequelize-typescript';
import { PostView } from 'src/post/vo/post_view.dto';

@Injectable()
export class PostListDto {
  offset: number;
  limit: number;
}
