import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserCreateDto } from './dto/user.create.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  // 이메일이 중복되면 true,
  async checkEmailDuplicated(email: string) {
    const user = await this.userRepository.findOneByEmail(email);
    return user !== null;
  }

  // 이메일로 사용자 탐색
  async findOneByEmail(email: string) {
    return await this.userRepository.findOneByEmail(email);
  }

  // 식별자로 사용자 탐색
  async findOneById(id: bigint) {
    return await this.userRepository.findOneById(id);
  }

  // 사용자 삭제
  async deleteOneById(id: bigint) {
    return await this.userRepository.deleteOneById(id);
  }

  // 회원가입
  async signup(value: UserCreateDto) {
    return this.userRepository.createOne(value);
  }
}
