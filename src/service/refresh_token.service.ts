import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { RefreshTokenCreateDto } from 'src/dto/refresh_token.create.dto';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { User } from 'src/entity/user.entity';
import { RefreshTokenRepository } from 'src/repository/refresh_token.repository';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class RefreshTokenService {
  constructor(private tokenRepository: RefreshTokenRepository) {}

  // 이메일이 중복되면 true,
  async checkToken(token: string) {
    return await this.tokenRepository.findOneByToken(token);
  }

  // 이메일이 중복되면 true,
  async createToken(userId: bigint, token: string) {
    return await this.tokenRepository.createOne({ userId, tokenValue: token });
  }

  // 이메일이 중복되면 true,
  async deleteToken(token: string) {
    return await this.tokenRepository.deleteOneByToken(token);
  }
}
