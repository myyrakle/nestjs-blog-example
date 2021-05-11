import { Inject, Injectable } from '@nestjs/common';
import { PostCommentCreateDto } from './dto/post-comment.create.dto';
import { PostCommentUpdateDto } from './dto/post-comment.update.dto';
import { PostCommentRepository } from './post-comment.repository';
import { PostCommentView } from './vo/post-comment-view.dto';

@Injectable()
export class PostCommentService {
  constructor(private postCommentRepository: PostCommentRepository) {}

  // 식별자로 탐색
  async findOneById(id: bigint) {
    return await this.postCommentRepository.findOneById(id);
  }

  // 댓글 삭제
  async deleteOneById(id: bigint) {
    return await this.postCommentRepository.deleteOneById(id);
  }

  // 댓글 생성
  async createOne(value: PostCommentCreateDto) {
    return await this.postCommentRepository.createOne(value);
  }

  // 댓글 수정
  async updateOne(value: PostCommentUpdateDto) {
    return await this.postCommentRepository.updateOne(value);
  }

  // 댓글 목록조회
  async findList(postId: bigint) {
    return await this.postCommentRepository.findList(postId);
  }
}
