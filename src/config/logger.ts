import winston from 'winston';
import { Config } from './index';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'auth-service' },
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
        }),
        new winston.transports.File({
            filename: 'combined.log',
            level: 'info',
            dirname: 'logs',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            silent: Config.NODE_ENV === 'test', // Disable logging to file in test environment
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            dirname: 'logs',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
        }),
    ],
});

export default logger;
