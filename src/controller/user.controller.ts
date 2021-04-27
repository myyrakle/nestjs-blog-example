import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SignupRequestDto } from 'src/dto/signup.request.dto';
import { SignupResponseDto } from 'src/dto/signup.response.dto';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserService } from 'src/service/user.service';
import { AppService } from '../service/app.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: SignupRequestDto): Promise<SignupResponseDto> {
    if (await this.userService.checkEmailDuplicated(body?.email)) {
      return {
        success: false,
        emailDuplicated: true,
        message: '이메일 겹침',
        error: null,
      };
    } else {
      await this.userService.signup(
        new UserCreateDto({ ...body, userType: 'USER' }),
      );

      return {
        success: true,
        emailDuplicated: false,
        message: '성공',
        error: null,
      };
    }
  }
}
