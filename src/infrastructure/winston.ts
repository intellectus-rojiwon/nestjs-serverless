import * as nest from '@nestjs/common';
import * as winston from 'winston';

import { Configuration } from './config';

type LogMethod = (message: unknown) => void;

/** LoggerService interface */
type ILogger = Readonly<Record<nest.LogLevel, LogMethod>>;

const transports: winston.transport =
    Configuration.NODE_ENV === 'production'
        ? new winston.transports.Stream({
              level: 'log',
              stream: process.stdout,
              format: winston.format.printf(
                  (info) => `[${info.level}] ${info.message}`,
              ),
          })
        : new winston.transports.Console({
              level: 'debug',
              format: winston.format.combine(
                  winston.format.colorize({
                      message: true,
                      colors: {
                          fatal: 'purple',
                          error: 'red',
                          warn: 'yellow',
                          log: 'white',
                          verbose: 'white',
                          debug: 'white',
                      },
                  }),
                  winston.format.printf(
                      (info) => `[${info.level}]` + ' ' + info.message,
                  ),
              ),
          });

const winstonLogger = winston.createLogger({
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        log: 3,
        verbose: 4,
        debug: 5,
    },
    transports,
});

const write =
    (level: nest.LogLevel) =>
    (message: unknown): void => {
        winstonLogger.log(level, JSON.stringify(message));
    };

export const logger: ILogger = {
    fatal(message) {
        if (message instanceof Error) {
            const { message: msg, name, stack, ...meta } = message;
            write('fatal')(
                stack
                    ? stack + JSON.stringify(meta)
                    : { name, message: msg, ...meta },
            );
            return;
        }
        write('fatal')(message);
    },
    error(message) {
        if (message instanceof Error) {
            const { message: msg, name, stack, ...meta } = message;
            write('error')(
                stack
                    ? stack + JSON.stringify(meta)
                    : { name, message: msg, ...meta },
            );
            return;
        }
        write('error')(message);
    },
    warn: write('warn'),
    log: write('log'),
    verbose: write('verbose'),
    debug: write('debug'),
};
