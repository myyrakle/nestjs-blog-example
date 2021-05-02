import { Injectable } from '@nestjs/common';

@Injectable()
export class PostUpdateRequestDto {
  title: string;
  content: string;
}
