import { Table, Column, Model, Unique, Comment } from 'sequelize-typescript';

export enum UserType {
  ADMIN,
  USER,
}

@Table
export class User extends Model {
  @Comment('이메일(아이디)')
  @Column
  email: string;

  @Comment('해싱된 패스워드')
  @Column
  password: string;

  @Comment('패스워드 솔팅값')
  @Column
  passwordSalt: string;

  @Comment('사용자 이름')
  @Column
  name: string;

  @Comment('사용자 타입')
  @Column
  userType: UserType;
}
