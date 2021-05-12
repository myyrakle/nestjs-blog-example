import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class PostCommentCreateRequestDto {
  postId: bigint;
  parentId?: bigint;
  content: string;
}
