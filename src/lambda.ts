import sls from '@codegenie/serverless-express';
import { Handler } from 'aws-lambda';

import { Backend } from './backend';
import { logger } from './infrastructure/winston';

let _handler: Handler | null = null;

const bootstrap = async (): Promise<Handler> => {
    const app = await Backend.open({ logger });
    logger.log('nest application 생성');
    return sls({ app: app.getHttpAdapter().getInstance() });
};

export const handler: Handler = async (event, context, callback) => {
    if (_handler === null) _handler = await bootstrap();

    return _handler(event, context, callback);
};
