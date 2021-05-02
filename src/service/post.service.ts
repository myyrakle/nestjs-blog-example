import { Inject, Injectable } from '@nestjs/common';
import { PostCreateDto } from 'src/dto/post.create.dto';
import { PostUpdateDto } from 'src/dto/post.update.dto';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { PostRepository } from 'src/repository/post.repository';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  // 식별자로 탐색
  async findOneById(id: bigint) {
    return await this.postRepository.findOneById(id);
  }

  // 게시글 삭제
  async deleteOneById(id: bigint) {
    return await this.postRepository.deleteOneById(id);
  }

  // 게시글 생성
  async createOne(value: PostCreateDto) {
    return await this.postRepository.createOne(value);
  }

  // 게시글 수정
  async updateOne(value: PostUpdateDto) {
    return await this.postRepository.createOne(value);
  }
}
