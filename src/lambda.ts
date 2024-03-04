import sls from '@codegenie/serverless-express';
import { Handler } from 'aws-lambda';

import { Backend } from './backend';
import { logger } from './infrastructure/winston';

let _handler: Handler | null = null;

const bootstrap = async (): Promise<Handler> => {
    const app = await Backend.open({ logger });
    // lambda 초기화시 init method를 명시적으로 실행하지 않으면
    // AppModule imported module 이외에 의존성이 초기화되지 않음
    await app.init();
    return sls({ app: app.getHttpAdapter().getInstance() });
};

export const handler: Handler = async (event, context, callback) => {
    if (_handler === null) _handler = await bootstrap();

    return _handler(event, context, callback);
};
