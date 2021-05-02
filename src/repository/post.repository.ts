import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PostCreateDto } from 'src/dto/post.create.dto';
import { PostUpdateDto } from 'src/dto/post.update.dto';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { UserUpdateDto } from 'src/dto/user.update.dto';
import { Post } from 'src/entity/post.entity';
import { User } from 'src/entity/user.entity';
import { PostView } from 'src/vo/post_view.dto';

@Injectable()
export class PostRepository {
  constructor(private _connection: Sequelize) {}

  // 게시글 생성
  async createOne(value: PostCreateDto) {
    const post = Post.build({
      ...value,
    });
    return await post.save();
  }

  // 게시글 수정
  async updateOne(value: PostUpdateDto) {
    return await Post.update({ ...value }, { where: { id: value.id } });
  }

  // 계정 정보 삭제
  async deleteOneById(id: bigint) {
    return await Post.update({ useYn: false }, { where: { id: id } });
  }

  // 식별자로 조회
  async findOneById(id: bigint): Promise<PostView> {
    return await Post.findOne({
      where: { id, useYn: true },
      include: { model: User, attributes: ['name', 'email', 'userType'] },
    });
  }
}
