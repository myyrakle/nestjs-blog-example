import { Inject, Injectable } from '@nestjs/common';
import { PostCreateDto } from 'src/dto/post.create.dto';
import { PostUpdateDto } from 'src/dto/post.update.dto';
import { PostCommentCreateDto } from 'src/dto/post_comment.create.dto';
import { PostCommentUpdateDto } from 'src/dto/post_comment.update.dto';
import { PostListDto } from 'src/dto/post_list.dto';
import { UserCreateDto } from 'src/dto/user.create.dto';
import { PostRepository } from 'src/repository/post.repository';
import { PostCommentRepository } from 'src/repository/post_comment.repository';
import { PostCommentView } from 'src/vo/post_comment_view.dto';
import { PostView } from 'src/vo/post_view.dto';

@Injectable()
export class PostCommentService {
  constructor(private postCommentRepository: PostCommentRepository) {}

  // 식별자로 탐색
  async findOneById(id: bigint) {
    return await this.postCommentRepository.findOneById(id);
  }

  // 게시글 삭제
  async deleteOneById(id: bigint) {
    return await this.postCommentRepository.deleteOneById(id);
  }

  // 게시글 생성
  async createOne(value: PostCommentCreateDto) {
    return await this.postCommentRepository.createOne(value);
  }

  // 게시글 수정
  async updateOne(value: PostCommentUpdateDto) {
    return await this.postCommentRepository.updateOne(value);
  }

  // 게시글 목록조회
  async findList(postId: bigint): Promise<PostCommentView[]> {
    return await this.postCommentRepository.findList(postId);
  }
}
