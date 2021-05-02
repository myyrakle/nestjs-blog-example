import { Injectable } from '@nestjs/common';
import { PostView } from 'src/vo/post_view.dto';

@Injectable()
export class PostListResponseDto {
  success: boolean;
  list: PostView[];
  totalCount: bigint;

  message?: string;
  error?: any;
}
