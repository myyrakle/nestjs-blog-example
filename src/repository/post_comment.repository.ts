import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PostCreateDto } from 'src/dto/post.create.dto';
import { PostUpdateDto } from 'src/dto/post.update.dto';
import { PostCommentCreateDto } from 'src/dto/post_comment.create.dto';
import { PostCommentUpdateDto } from 'src/dto/post_comment.update.dto';
import { PostListDto } from 'src/dto/post_list.dto';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { UserUpdateDto } from 'src/dto/user.update.dto';
import { PostComment } from 'src/entity/post.comment.entity';
import { Post } from 'src/entity/post.entity';
import { User } from 'src/entity/user.entity';
import { PostCommentView } from 'src/vo/post_comment_view.dto';
import { PostView } from 'src/vo/post_view.dto';

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
