import * as nest from '@nestjs/common';
import * as winston from 'winston';

import { Configuration } from './config';

type LogMethod = (message: unknown) => void;

/** LoggerService interface */
type ILogger = Readonly<Record<nest.LogLevel, LogMethod>>;
/**
 * lambda 환경에서는 별도의 로그 스트림 연결이 필요 없음
import { CloudWatchLogsClient, PutLogEventsCommand } from '@aws-sdk/client-cloudwatch-logs';
import { Writable } from 'stream';
const aws_client = new CloudWatchLogsClient();
new Writable({
    write(chunk, _, callback) {
        const command = new PutLogEventsCommand({
            logGroupName: Configuration.AWS_LOG_GROUP,
            logStreamName: Configuration.NODE_ENV,
            logEvents: [
                {
                    message: chunk.toString(),
                    timestamp: Date.now(),
                },
            ],
        });
        aws_client
            .send(command)
            .then(() => callback())
            .catch(console.log);
    },
})
*/
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
    level: Configuration.NODE_ENV === 'production' ? 'WARN' : 'DEBUG',
    transports,
});

const write =
    (level: 'FATAL' | 'ERROR' | 'WARN' | 'LOG' | 'VERBOSE' | 'DEBUG') =>
    (message: unknown): void => {
        winstonLogger.log(
            level,
            new Date().toLocaleString(undefined, {
                timeZoneName: 'longGeneric',
            }) +
                ' ' +
                JSON.stringify(message).replaceAll('\\n', '\n'),
        );
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
