import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { logger } from './infrastructure/logger';

export namespace Backend {
    /**
    const friendlyDate = () =>
        new Date().toLocaleString(undefined, {
            timeZoneName: 'longGeneric',
        });
    */

    export const open = async (options: NestApplicationOptions = {}) => {
        const app = await NestFactory.create(AppModule, options);
        app.use(cookieParser()).use(
            helmet({ contentSecurityPolicy: true, hidePoweredBy: true }),
        );
        process.on('SIGINT', async () => {
            await app.close();
            logger.log('nest application 종료');
            process.exit(0);
        });
        return app;
    };
}
