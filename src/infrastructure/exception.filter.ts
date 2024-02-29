import * as nest from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

import { Failure } from '@APP/utils/failure';

@nest.Catch()
export class ExceptionFilter implements nest.ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: nest.ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        if (this.isHttpException(exception)) {
            const status = exception.getStatus();
            const message = exception.message;

            httpAdapter.reply(
                res,
                status === nest.HttpStatus.NOT_FOUND
                    ? {
                          code: 'NOT_FOUND_PATH',
                          message,
                      }
                    : status === nest.HttpStatus.BAD_REQUEST
                      ? {
                            code: 'INVALID_INPUT',
                            message,
                        }
                      : {
                            code: 'UNKNOWN_ERROR',
                            message,
                        },
                status,
            );
            return;
        }

        if (exception instanceof Failure)
            httpAdapter.reply(
                res,
                {
                    code: exception.message,
                    message: exception.cause,
                },
                +exception.status,
            );

        console.log(exception);
        httpAdapter.reply(
            res,
            { code: 'NTERNAL_SERVER_ERROR' },
            nest.HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }

    isHttpException(error: unknown): error is nest.HttpException {
        const prototype = Object.getPrototypeOf(error);
        if (typeof prototype === 'object' && prototype !== null) {
            const name = prototype.constructor.name;
            if (name === 'HttpException') return true;
            if (name === 'Error' || name === 'Object') return false; // 재귀 단축
            return this.isHttpException(prototype);
        }
        return false;
    }
}
