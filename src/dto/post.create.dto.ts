import { Injectable } from '@nestjs/common';

@Injectable()
export class PostCreateDto {
  userId: bigint;
  title: string;
  content: string;
}
