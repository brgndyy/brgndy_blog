import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import CORS_CONFIG from './constants/configs/corsConfig';
import { CustomError } from './@types/type';
import ERROR_MESSAGE from './constants/messages/errorMessage';
import PROGRESS_MESSAGE from './constants/messages/progressMessage';
import sequelize from './models';
import { postRoutes } from './routes/postRoutes';
import { userRoutes } from './routes/userRoutes';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 80);

app.use(cors(CORS_CONFIG));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(process.env.BACK_END_NODE_ENV === 'production' ? morgan('combined') : morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static('src/assets/images'));

sequelize
  .query('SET FOREIGN_KEY_CHECKS = 0')
  // .then(() => sequelize.query('TRUNCATE TABLE refreshTokens'))
  // .then(() => sequelize.query('TRUNCATE TABLE userSettings'))
  // .then(() => sequelize.query('TRUNCATE TABLE authEmailRecords'))
  .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
  .then(() => sequelize.sync({ force: false }))
  .then(() => {
    console.log(PROGRESS_MESSAGE.succeed_connect_database);
  })
  .catch((err) => {
    console.error(err);
  });

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.log(res);
  res.status(error.code || 500);
  res.json({ message: error.message || ERROR_MESSAGE.default_error });
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('블로그 실행');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), PROGRESS_MESSAGE.ready_from_port);
});
