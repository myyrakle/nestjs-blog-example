import { Injectable } from '@nestjs/common';
import { PostView } from 'src/vo/post_view.dto';

@Injectable()
export class PostSelectResponseDto {
  success: boolean;
  post: PostView;
  message?: string;
  error?: any;
}
