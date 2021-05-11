import {
  Table,
  Column,
  Model,
  Unique,
  Comment,
  DataType,
  Default,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Table
export class PostComment extends Model {
  @Comment('식별자')
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint;

  @Comment('사용자')
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: bigint;

  @Comment('포스트')
  @AllowNull(false)
  @ForeignKey(() => Post)
  @Column
  postId: bigint;

  @Comment('상위 식별자(대댓글)')
  @AllowNull(true)
  @ForeignKey(() => PostComment)
  @Column
  parentId: bigint;

  @Comment('포스트 내용')
  @AllowNull(false)
  @Column(DataType.TEXT)
  content: string;

  @Comment('사용여부 (논리적 삭제)')
  @AllowNull(false)
  @Default(true)
  @Column
  useYn: boolean;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => PostComment)
  childList: PostComment[];
}
