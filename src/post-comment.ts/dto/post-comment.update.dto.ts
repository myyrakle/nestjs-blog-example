import { Injectable } from '@nestjs/common';

@Injectable()
export class PostCommentUpdateDto {
  id: bigint;
  userId?: bigint;
  postId?: bigint;
  parentId?: bigint;
  content: string;
}
