import * as nest from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

import { Exception } from '@SRC/common/exception';

import { logger } from './logger';

@nest.Catch()
export class ExceptionFilter implements nest.ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: nest.ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        if (exception instanceof Exception) {
            const status = exception.getStatus();
            const body = exception.body;
            logger.warn(exception);
            httpAdapter.reply(res, body, status);
        }

        if (this.isHttpException(exception)) {
            const status = exception.getStatus();
            const response = exception.getResponse();
            const message =
                typeof response === 'object' &&
                'message' in response &&
                typeof response['message'] === 'string'
                    ? response['message']
                    : undefined;
            httpAdapter.reply(res, { code: 'NATIVE_ERROR', message }, status);
            return;
        }

        logger.error(exception);
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
