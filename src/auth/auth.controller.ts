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
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { LogoutRequestDto } from './dto/logout.request.dto';
import { LogoutResponseDto } from './dto/logout.response.dto';
import { RefreshRequestDto } from './dto/refresh.request.dto';
import { makeAccessToken, makeRefreshToken } from 'src/lib/jwt';
import { passwordHashing } from 'src/lib/password';
import { RefreshTokenService } from 'src/refresh-tokens/refresh-token.service';
import { UserService } from 'src/user/user.service';
import { AppService } from '../app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DefaultResponseDto } from 'src/lib/dto/default.response.dto';

@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: RefreshTokenService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '성공', type: LoginResponseDto })
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
  @ApiOperation({ summary: '로그인 리프레시' })
  @ApiResponse({ status: 200, description: '성공', type: RefreshRequestDto })
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
  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 200, description: '성공', type: DefaultResponseDto })
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Query() query: LogoutRequestDto,
  ): Promise<DefaultResponseDto> {
    await this.tokenService.deleteToken(query.refreshToken);

    response.clearCookie('accessToken');

    return {
      success: true,
      message: '',
      error: null,
    };
  }
}
