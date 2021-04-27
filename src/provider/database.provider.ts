import { Sequelize } from 'sequelize-typescript';
import { User } from '../entity/user.entity';

const DATABASE_URL = process.env['NEST_JS_TEST_DATEBASE_URL'];

console.log(DATABASE_URL);

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(DATABASE_URL);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
