import { Inject, Injectable } from '@nestjs/common';
import { PostCreateDto } from 'src/post/dto/post.create.dto';
import { PostUpdateDto } from 'src/post/dto/post.update.dto';
import { PostListDto } from 'src/post/dto/post-list.dto';
import { UserCreateDto } from 'src/user/dto/user.create.dto';
import { PostRepository } from 'src/post/post.repository';
import { PostView } from 'src/post/vo/post-view.dto';

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
    return await this.postRepository.updateOne(value);
  }

  // 게시글 목록조회
  async findList(value: PostListDto): Promise<[PostView[], bigint]> {
    const result: any[] = await this.postRepository.findList(value);
    const list: PostView[] = result.map((e) => ({
      id: e.id,
      userId: e.userId,
      title: e.title,
      content: e.content,
      user: e.user,
    }));
    const totalCount = result.length === 0 ? 0 : result[0].totalCount;

    return [list, totalCount];
  }

  // 게시글 목록조회
  async test() {
    return await this.postRepository.test();
  }
}
