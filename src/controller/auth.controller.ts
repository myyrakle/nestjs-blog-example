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
import { LoginRequestDto } from 'src/dto/auth/login.request.dto';
import { LoginResponseDto } from 'src/dto/auth/login.response.dto';
import { LogoutRequestDto } from 'src/dto/auth/logout.request.dto';
import { LogoutResponseDto } from 'src/dto/auth/logout.response.dto';
import { RefreshRequestDto } from 'src/dto/auth/refresh.request.dto';
import { makeAccessToken, makeRefreshToken } from 'src/lib/jwt';
import { passwordHashing } from 'src/lib/password';
import { RefreshTokenService } from 'src/service/refresh_token.service';
import { UserService } from 'src/service/user.service';
import { AppService } from '../service/app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly _appService: AppService,
    private readonly userService: UserService,
    private readonly tokenService: RefreshTokenService,
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

        await this.tokenService.createToken(user.id, refreshToken);

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
        message: '',
        error: null,
      };
    }
  }

  @Put('/refresh')
  async refresh(
    @Body() body: RefreshRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.tokenService.checkToken(body.refreshToken);

    if (token != null) {
      const user = await this.userService.findOneById(token?.userId);
      const accessToken = makeAccessToken({ userId: user?.id });
      response.cookie('accessToken', accessToken);

      return {
        success: true,
        message: '성공',
        error: null,
      };
    } else {
      return {
        success: false,
        message: '유효하지 않은 토큰',
        error: null,
      };
    }
  }

  @Delete('/logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Query() query: LogoutRequestDto,
  ): Promise<LogoutResponseDto> {
    await this.tokenService.deleteToken(query.refreshToken);

    response.clearCookie('accessToken');

    return {
      success: true,
      message: '',
      error: null,
    };
  }
}
