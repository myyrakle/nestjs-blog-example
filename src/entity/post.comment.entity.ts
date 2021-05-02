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
} from 'sequelize-typescript';
import { Post } from './post.entity';
import { User } from './user.entity';

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
  userId: string;

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

  @BelongsTo(() => User)
  user: User;
}
