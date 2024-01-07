import deepFreeze from '../../utils/deepFreeze';
import PATH from '../path/path';

const CORS_CONFIG = deepFreeze({
  origin: PATH.default_front_url,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

export default CORS_CONFIG;
