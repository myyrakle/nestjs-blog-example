import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PostCreateDto } from 'src/post/dto/post.create.dto';
import { PostUpdateDto } from 'src/post/dto/post.update.dto';
import { PostListDto } from 'src/post/dto/post-list.dto';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
import { UserUpdateDto } from '../user/dto/user.update.dto';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import { PostView } from 'src/post/vo/post-view.dto';

@Injectable()
export class PostRepository {
  constructor(private connection: Sequelize) {}

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

  // 목록 조회
  async findList(value: PostListDto) {
    console.error('음');
    console.error(value.limit, value.offset);
    return await this.connection.query(
      `
      SELECT 
        *
      FROM 
      (
        SELECT 
          *
          , COUNT(1) OVER() AS "totalCount" 
        FROM "Posts"
        WHERE 1=1
          AND "useYn" IS TRUE
      ) T
      ORDER BY T."createdAt" DESC
      OFFSET :offset
      LIMIT :limit
    `,
      {
        type: QueryTypes.SELECT,
        replacements: { offset: value.offset, limit: value.limit },
      },
    );
  }

  async test() {
    return await Post.findAll({
      include: {
        model: User,
        as: 'user',
      },
      order: [['user', 'name', 'asc']],
    });
  }
}
