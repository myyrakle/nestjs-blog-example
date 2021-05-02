import { Injectable } from '@nestjs/common';

@Injectable()
export class PostCreateResponseDto {
  success: boolean;
  postId: bigint;
  message?: string;
  error?: any;
}
