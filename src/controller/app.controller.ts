import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly appService: AppService) {}

  @Post('/signup')
  signup(): string {
    return this.appService.getHello();
  }
}
