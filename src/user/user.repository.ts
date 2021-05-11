import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UserCreateDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class UserRepository {
  constructor(private connection: Sequelize) {}

  // 계정 생성
  async createOne(value: UserCreateDto): Promise<User> {
    const user = User.build({
      ...value,
    });
    return await user.save();
  }

  // 계정 정보 수정
  async updateOne(value: UserUpdateDto): Promise<User> {
    const id = value.id;

    const [_count, [result]] = await User.update(
      { ...value },
      { where: { id: id } },
    );

    return result;
  }

  // 계정 정보 삭제
  async deleteOneById(id: bigint) {
    return await User.update({ userStatus: id }, { where: { id: id } });
  }

  // 이메일로 조회
  async findOneById(id: bigint): Promise<User> {
    return await User.findOne({ where: { id, userStatus: 0 } });
  }

  // 이메일로 조회
  async findOneByEmail(email: string): Promise<User> {
    return await User.findOne({ where: { email, userStatus: 0 } });
  }
}
