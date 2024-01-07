import { Sequelize } from 'sequelize';
import { Config } from 'types';
import configData from '../config/config';
import { initUser, User } from './users';
import { initPost, Post } from './posts';

const configs: Config = configData;
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const config = configs[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password === null ? undefined : config.password,
  {
    host: config.host,
    dialect: 'mysql',
    timezone: '+09:00',
  },
);

initUser(sequelize);
initPost(sequelize);

function setupAssociations(): void {
  Post.belongsTo(User, { foreignKey: 'userId' });
}

setupAssociations();

export default sequelize;
