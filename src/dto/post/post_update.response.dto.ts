import { Injectable } from '@nestjs/common';

@Injectable()
export class PostUpdateResponseDto {
  success: boolean;
  postId: bigint;
  message?: string;
  error?: any;
}
