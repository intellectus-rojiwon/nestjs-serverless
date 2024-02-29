import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

import { Configuration } from './config';

export const WinstonLogger = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            level: Configuration.NODE_ENV === 'production' ? 'info' : 'silly',
            format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike('Intellectus', {
                    prettyPrint: true,
                }),
            ),
        }),
    ],
});
