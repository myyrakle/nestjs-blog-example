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
import { UserView } from 'src/user/dto/user-view.dto';
import { User } from '../user/user.entity';

@Table
export class Post extends Model {
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

  @Comment('포스트 타이틀')
  @AllowNull(false)
  @Column(DataType.TEXT)
  title: string;

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
  user: UserView;
}
