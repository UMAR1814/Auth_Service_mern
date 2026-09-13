import express, { Response, NextFunction, Request } from 'express';
import logger from './config/logger';
import { HttpError } from 'http-errors';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statuscode = err.statusCode || 500;
    res.status(statuscode).json({
        errors: [
            {
                type: err.name,
                message: err.message,
                path: '',
                location: '',
            },
        ],
    });
});

export default app;
