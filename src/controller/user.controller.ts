import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CheckEmailRequestDto } from 'src/dto/check_email.request.dto';
import { CheckEmailResponseDto } from 'src/dto/check_email.response.dto';
import { SignupRequestDto } from 'src/dto/signup.request.dto';
import { SignupResponseDto } from 'src/dto/signup.response.dto';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserService } from 'src/service/user.service';
import { AppService } from '../service/app.service';

@UseGuards(AuthGuard)
@Controller('/user')
export class UserController {
  constructor(
    private readonly _appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: SignupRequestDto): Promise<SignupResponseDto> {
    const emailDeplicated = await this.userService.checkEmailDuplicated(
      body?.email,
    );

    if (emailDeplicated) {
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

  @Get('/check-email-duplicated')
  async checkEmailDuplicated(
    @Query() query: CheckEmailRequestDto,
  ): Promise<CheckEmailResponseDto> {
    const emailDuplicated = await this.userService.checkEmailDuplicated(
      query?.email,
    );

    return {
      success: true,
      emailDuplicated,
      message: '',
      error: null,
    };
  }
}
