import deepFreeze from '../../utils/deepFreeze';
import * as dotenv from 'dotenv';

dotenv.config();

const origin =
  process.env.BACK_END_NODE_ENV === 'production'
    ? process.env.DEFAULT_FRONT_URL
    : process.env.DEV_FRONT_URL;

const CORS_CONFIG = deepFreeze({
  origin: origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
});

export default CORS_CONFIG;
