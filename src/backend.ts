import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { Router } from './controllers';
import { InfraModule } from './infrastructure/infra.module';

export namespace Backend {
    /**
    const friendlyDate = () =>
        new Date().toLocaleString(undefined, {
            timeZoneName: 'longGeneric',
        });
    */

    export const open = async (options: NestApplicationOptions = {}) => {
        const app = await NestFactory.create(
            await Router.mount({ imports: [InfraModule, AppModule] }),
            options,
        );
        app.use(cookieParser()).use(
            helmet({ contentSecurityPolicy: true, hidePoweredBy: true }),
        );
        process.on('SIGINT', async () => {
            await close(app);
            process.exit(0);
        });
        return app;
    };
    export const close = async (app: INestApplication) => {
        await app.close();
    };
}
