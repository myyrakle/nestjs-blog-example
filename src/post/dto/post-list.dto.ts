import { Injectable } from '@nestjs/common';

@Injectable()
export class PostListDto {
  offset: number;
  limit: number;
}
