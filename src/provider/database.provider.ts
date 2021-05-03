import { Sequelize } from 'sequelize-typescript';
import { PostComment } from 'src/entity/post.comment.entity';
import { Post } from 'src/entity/post.entity';
import { RefreshToken } from 'src/entity/refresh.token.entity';
import { User } from '../entity/user.entity';

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

      await sequelize.sync({ force: true }); // 개발시에만
      return sequelize;
    },
  },
];
