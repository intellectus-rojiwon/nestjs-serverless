import * as nest from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { RequestListener } from 'http';

import { AppModule } from './app/app.module';
import { Configuration } from './infrastructure/config';
import { logger } from './infrastructure/logger';

export class Backend {
    private constructor(private readonly _application: nest.INestApplication) {}

    static async create(
        options: nest.NestApplicationOptions = {},
    ): Promise<Backend> {
        const app = await NestFactory.create(AppModule, options);
        app.use(cookieParser()).use(
            helmet({ contentSecurityPolicy: true, hidePoweredBy: true }),
        );
        const backend = new Backend(app);
        process.on('SIGINT', async () => {
            await backend.close();
            process.exit(0);
        });
        await app.init();
        logger.log('nest application created');
        return backend;
    }

    async open() {
        await this._application.listen(Configuration.PORT);
    }

    async close() {
        await this._application.close();
        logger.log('nest application closed');
    }

    getHttpAdapter(): RequestListener {
        return this._application.getHttpAdapter().getInstance();
    }
}
