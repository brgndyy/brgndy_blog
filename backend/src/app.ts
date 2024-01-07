import express, { Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import CORS_CONFIG from './constants/configs/corsConfig';
import { CustomError } from 'types';
import ERROR_MESSAGE from './constants/messages/errorMessage';
import PROGRESS_MESSAGE from './constants/messages/progressMessage';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3002);

app.use(cors(CORS_CONFIG));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(process.env.NODE_ENV === 'production' ? morgan('combined') : morgan('dev'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((error: CustomError, req: Request, res: Response) => {
  res.status(error.code || 500);
  res.json({ message: error.message || ERROR_MESSAGE.default_error });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), PROGRESS_MESSAGE.ready_from_port);
});
