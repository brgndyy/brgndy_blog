import deepFreeze from '../../utils/deepFreeze';
import * as dotenv from 'dotenv';

dotenv.config();

const CORS_CONFIG = deepFreeze({
  origin: process.env.DEFAULT_FRONT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

export default CORS_CONFIG;
