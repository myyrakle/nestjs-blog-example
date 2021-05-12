import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PostCommentCreateDto } from 'src/post-comment.ts/dto/post-comment.create.dto';

import { PostComment } from 'src/post-comment.ts/post-comment.entity';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import { PostCommentView } from 'src/post-comment.ts/vo/post-comment-view.dto';
import { PostCommentUpdateDto } from './dto/post-comment.update.dto';

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
      where: { postId, useYn: true, parentId: null },
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
          required: false,
        },
      ],
    });
  }
}
