import * as nest from '@nestjs/common';
import * as winston from 'winston';

import { Configuration } from './config';

type LogMethod = (message: unknown) => void;

/** LoggerService interface */
type ILogger = Readonly<Record<nest.LogLevel, LogMethod>>;

const transports: winston.transport =
    Configuration.NODE_ENV === 'production'
        ? new winston.transports.Stream({
              stream: process.stdout,
              format: winston.format.printf(
                  (info) => `[${info.level}] ${info.message}`,
              ),
          })
        : new winston.transports.Console({
              format: winston.format.combine(
                  winston.format.colorize({
                      message: true,
                      colors: {
                          FATAL: 'purple',
                          ERROR: 'red',
                          WARN: 'yellow',
                          LOG: 'white',
                          VERBOSE: 'white',
                          DEBUG: 'white',
                      },
                  }),
                  winston.format.printf(
                      (info) => `[${info.level}]` + ' ' + info.message,
                  ),
              ),
          });

const winstonLogger = winston.createLogger({
    levels: {
        FATAL: 0,
        ERROR: 1,
        WARN: 2,
        LOG: 3,
        VERBOSE: 4,
        DEBUG: 5,
    },
    level: Configuration.NODE_ENV === 'production' ? 'LOG' : 'DEBUG',
    transports,
});

const write =
    (level: 'FATAL' | 'ERROR' | 'WARN' | 'LOG' | 'VERBOSE' | 'DEBUG') =>
    (message: unknown): void => {
        winstonLogger.log(level, JSON.stringify(message));
    };

export const logger: ILogger = {
    fatal(message) {
        if (message instanceof Error) {
            const { message: msg, name, stack, ...meta } = message;
            write('FATAL')(
                stack
                    ? stack + JSON.stringify(meta)
                    : { name, message: msg, ...meta },
            );
            return;
        }
        write('FATAL')(message);
    },
    error(message) {
        if (message instanceof Error) {
            const { message: msg, name, stack, ...meta } = message;
            write('ERROR')(
                stack
                    ? stack + JSON.stringify(meta)
                    : { name, message: msg, ...meta },
            );
            return;
        }
        write('ERROR')(message);
    },
    warn: write('WARN'),
    log: write('LOG'),
    verbose: write('VERBOSE'),
    debug: write('DEBUG'),
};
