import sls from '@codegenie/serverless-express';
import { Handler } from 'aws-lambda';

import { Backend } from './backend';
import { logger } from './infrastructure/logger';

let _handler: Handler | null = null;

const bootstrap = async (): Promise<Handler> => {
    const app = await Backend.create({ logger });
    return sls({ app: app.getHttpAdapter().getInstance() });
};

export const handler: Handler = async (event, context, callback) => {
    if (_handler === null) _handler = await bootstrap();

    return _handler(event, context, callback);
};
