import { Sequelize } from 'sequelize';
import { Config } from 'types';
import configData from '../config/config';

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

export default sequelize;
