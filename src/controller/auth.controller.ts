import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CheckEmailRequestDto } from 'src/dto/check_email.request.dto';
import { CheckEmailResponseDto } from 'src/dto/check_email.response.dto';
import { LoginRequestDto } from 'src/dto/login.request.dto';
import { LoginResponseDto } from 'src/dto/login.response.dto';
import { SignupRequestDto } from 'src/dto/signup.request.dto';
import { SignupResponseDto } from 'src/dto/signup.response.dto';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { makeAccessToken, makeRefreshToken } from 'src/lib/jwt';
import { passwordHashing } from 'src/lib/password';
import { UserService } from 'src/service/user.service';
import { AppService } from '../service/app.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly _appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async login(
    @Body() body: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByEmail(body?.email);

    if (user != null) {
      if (user.password === passwordHashing(body.password, user.passwordSalt)) {
        const accessToken = makeAccessToken({ userId: user.id });
        const refreshToken = makeRefreshToken({ userId: user.id });

        response.cookie('accessToken', accessToken);

        return {
          success: true,
          refreshToken: refreshToken,
          message: '',
          error: null,
        };
      } else {
        return {
          success: false,
          refreshToken: null,
          message: '',
          error: null,
        };
      }
    } else {
      return {
        success: false,
        refreshToken: '',
        message: '이메일 겹침',
        error: null,
      };
    }
  }

  @Put('/refresh')
  async refresh(
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

  @Delete('/logout')
  async logout(
    @Req() req: Request,
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
