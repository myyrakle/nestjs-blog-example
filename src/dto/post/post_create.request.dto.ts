import { Injectable } from '@nestjs/common';

@Injectable()
export class PostCreateRequestDto {
  title: string;
  content: string;
}
