import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CheckEmailRequestDto } from 'src/user/dto/check-email.request.dto';
import { CheckEmailResponseDto } from './dto/check-email.response.dto';
import { MyInfoResponseDto } from './dto/my-info.response.dto';
import { SignupRequestDto } from './dto/signup.request.dto';
import { SignupResponseDto } from './dto/signup.response.dto';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/lib/decorator';
import {
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from '../app.service';
import { UserService } from './user.service';
import { AuthUser } from '../provider/auth_user.provider';
import { DefaultResponseDto } from '../lib/dto/default.response.dto';

@UseGuards(AuthGuard)
@Controller('/user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly authUser: AuthUser,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 200, description: '성공', type: SignupResponseDto })
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
  @ApiOperation({ summary: '이메일 중복체크' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CheckEmailResponseDto,
  })
  @ApiQuery({
    name: 'email',
    description: '이메일 값',
    type: 'string',
    example: 'sssang97@naver.com',
    required: true,
  })
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

  @Get('/my-info')
  @Roles(['USER'])
  @ApiOperation({ summary: '내 정보 조회(인증 필요)' })
  @ApiResponse({ status: 200, description: '성공', type: MyInfoResponseDto })
  async getMyInfo(): Promise<MyInfoResponseDto> {
    return {
      success: true,
      user: this.authUser?.user,
      message: '',
      error: null,
    };
  }

  @Delete('/close-my-account')
  @Roles(['USER'])
  @ApiOperation({ summary: '회원탈퇴' })
  @ApiResponse({ status: 200, description: '성공', type: DefaultResponseDto })
  async closeMyAccount(): Promise<DefaultResponseDto> {
    await this.userService.deleteOneById(this.authUser?.user?.id);
    return {
      success: true,
      message: '',
      error: null,
    };
  }
}
