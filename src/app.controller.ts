import { Controller, Get, Inject, Post } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthUser } from 'src/provider/auth_user.provider';
import { AppService } from './app.service';
@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(REQUEST) private readonly authUser: AuthUser,
  ) {}

  @Get()
  index() {
    return {
      message: 'Hello!',
      authorized: this?.authUser?.authorized ?? false,
      userInfo: this?.authUser?.user ?? null,
    };
  }
}
