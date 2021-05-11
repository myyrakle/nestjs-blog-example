import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { RefreshToken } from '../refresh-tokens/refresh-token.entity';
import { Post } from '../post/post.entity';
import { PostComment } from '../post-comment.ts/post-comment.entity';

const DATABASE_URL = process.env['NEST_JS_TEST_DATEBASE_URL'];

import * as pg from 'pg';
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
