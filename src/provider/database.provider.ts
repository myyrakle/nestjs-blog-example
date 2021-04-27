import { Sequelize } from 'sequelize-typescript';
import { User } from '../entity/user.entity';

const DATABASE_URL = process.env['NEST_JS_TEST_DATEBASE_URL'];

console.log(DATABASE_URL);

export const databaseProviders = [
  {
    provide: Sequelize,
    useFactory: async () => {
      const sequelize = new Sequelize(DATABASE_URL);
      sequelize.addModels([User]);
      await sequelize.sync({ force: true }); // 개발시에만
      return sequelize;
    },
  },
];
