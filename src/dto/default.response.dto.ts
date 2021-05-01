import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultResponseDto {
  success: boolean;
  message?: string;
  error?: any;
}
