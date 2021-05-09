import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PostCreateDto } from 'src/post/dto/post.create.dto';
import { PostUpdateDto } from 'src/post/dto/post.update.dto';
import { PostCommentCreateDto } from 'src/post_comment.ts/dto/post_comment.create.dto';

import { PostListDto } from 'src/post/dto/post_list.dto';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { UserUpdateDto } from 'src/dto/user.update.dto';
import { PostComment } from 'src/post_comment.ts/post.comment.entity';
import { Post } from 'src/post/post.entity';
import { User } from 'src/entity/user.entity';
import { PostCommentView } from 'src/post_comment.ts/vo/post_comment_view.dto';
import { PostView } from 'src/post/vo/post_view.dto';
import { PostCommentUpdateDto } from './dto/post_comment.update.dto';

@Injectable()
export class PostCommentRepository {
  constructor(private connection: Sequelize) {}

  // 댓글 생성
  async createOne(value: PostCommentCreateDto) {
    const comment = PostComment.build({
      ...value,
    });
    return await comment.save();
  }

  // 댓글 수정
  async updateOne(value: PostCommentUpdateDto) {
    return await PostComment.update({ ...value }, { where: { id: value.id } });
  }

  // 계정 정보 삭제
  async deleteOneById(id: bigint) {
    return await Post.update({ useYn: false }, { where: { id: id } });
  }

  // 식별자로 조회
  async findOneById(id: bigint): Promise<PostCommentView> {
    const comment = await PostComment.findOne({
      where: { id, useYn: true },
      include: {
        model: PostComment,
        attributes: ['name', 'email', 'userType'],
      },
    });
    return { ...comment, childList: [] };
  }

  // 목록 조회
  async findList(postId: bigint) {
    return await PostComment.findAll({
      where: { postId, useYn: true },
      order: [['createdAt', 'desc']],
      attributes: ['id', 'content', 'createdAt', 'userId'],
      include: [
        {
          model: User,
          attributes: ['id', 'email', 'name', 'userType'],
        },
        {
          model: PostComment,
          where: { useYn: true },
          order: [['createdAt', 'desc']],
          attributes: ['id', 'content', 'createdAt', 'userId'],
          include: [
            { model: User, attributes: ['id', 'email', 'name', 'userType'] },
          ],
        },
      ],
    });
  }
}
