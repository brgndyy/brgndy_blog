import deepFreeze from '../../utils/deepFreeze';
import * as dotenv from 'dotenv';

dotenv.config();

const CORS_CONFIG = deepFreeze({
  origin: 'https://brgndy.me',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
});

export default CORS_CONFIG;
