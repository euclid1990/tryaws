import dotenv from 'dotenv';
import path from 'path';
import { env } from '@utils';
dotenv.config({ path: path.join(__dirname, '../.env') });

export default {
  env: env('NODE_ENV', 'development'),
  host: env('HOST', '0.0.0.0'),
  port: env('PORT', 3000),
  logger: 'combined'
};
