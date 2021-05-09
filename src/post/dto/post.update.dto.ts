import { Injectable } from '@nestjs/common';

@Injectable()
export class PostUpdateDto {
  id: bigint;
  userId: bigint;
  title: string;
  content: string;
}
