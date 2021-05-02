import { Injectable } from '@nestjs/common';
import { Default } from 'sequelize-typescript';
import { PostView } from 'src/vo/post_view.dto';

@Injectable()
export class PostListDto {
  offset: number;
  limit: number;
}
