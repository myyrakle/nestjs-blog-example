import { Injectable } from '@nestjs/common';

@Injectable()
export class PostCommentCreateDto {
  userId: bigint;
  postId: bigint;
  parentId?: bigint;
  content: string;
}
