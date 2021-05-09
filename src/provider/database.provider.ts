import { Sequelize } from 'sequelize-typescript';
import { Post } from 'src/post/post.entity';
import { RefreshToken } from 'src/entity/refresh.token.entity';
import { User } from '../entity/user.entity';

const DATABASE_URL = process.env['NEST_JS_TEST_DATEBASE_URL'];

import * as pg from 'pg';
import { PostComment } from 'src/post_comment.ts/post.comment.entity';
pg.defaults.parseInt8 = true;

console.log(DATABASE_URL);

export const databaseProviders = [
  {
    provide: Sequelize,
    useFactory: async () => {
      const sequelize = new Sequelize(DATABASE_URL);
      sequelize.addModels([User, RefreshToken, Post, PostComment]);

      //sequelize.sync({ force: true }); // 개발시에만
      return sequelize;
    },
  },
];
