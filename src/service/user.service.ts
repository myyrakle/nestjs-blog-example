import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  // 이메일이 중복되면 true,
  async checkEmailDuplicated(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneByEmail(email);
    return user !== null;
  }

  // 이메일이 중복되면 true,
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByEmail(email);
  }

  // 이메일이 중복되면 true,
  async findOneById(id: bigint): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  // 회원가입
  async signup(value: UserCreateDto): Promise<User> {
    return this.userRepository.createOne(value);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
