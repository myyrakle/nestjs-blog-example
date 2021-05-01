import { Injectable, Scope } from '@nestjs/common';
import {
  MyBatisMapper,
  getMapper,
  createMapper,
} from 'mybatis-mapper-myyrakle';
import { join } from 'path';

@Injectable()
export class Mybatis {
  constructor() {
    this.mapper = getMapper();
    const sqlPath = join(__dirname, '..', '..', 'src', 'mybatis');
    createMapper([join(sqlPath, '/test.xml')]);
  }

  mapper: MyBatisMapper;
}
