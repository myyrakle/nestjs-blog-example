import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { RefreshTokenCreateDto } from './dto/refresh-token.create.dto';
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(private connection: Sequelize) {}

  // 토큰 생성
  async createOne(value: RefreshTokenCreateDto) {
    const token = RefreshToken.build({
      ...value,
    });
    return await token.save();
  }

  // 리프레시토큰 삭제
  async deleteOneByToken(token: string) {
    return await RefreshToken.update(
      { useYn: true },
      { where: { tokenValue: token } },
    );
  }

  // 토큰값으로 조회
  async findOneByToken(token: string) {
    return await RefreshToken.findOne({
      where: { tokenValue: token, useYn: true },
    });
  }
}
