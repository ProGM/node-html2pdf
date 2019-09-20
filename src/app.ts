require('dotenv').config();

import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as HttpStatus from 'http-status-codes';
import * as express from 'express';

import { Request, Response, NextFunction } from 'express';
import convertRoute from './routes/convertRoutes'

// Assign router to the express.Router() instance
const app: express.Application = express();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/convert', convertRoute);

if (process.env.NODE_ENV === 'development') {
	app.use((err: any, req: Request, res: Response, next: NextFunction) => {
		console.log(err.stack);
		res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: {
				ok: false,
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
			}
		});
	});
}

app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(HttpStatus.NOT_FOUND).json({
		error: {
			ok: false,
			code: HttpStatus.NOT_FOUND,
			error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
		}
	});
});

export default app;
