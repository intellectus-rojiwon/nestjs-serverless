import type nestia from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';

import { Router } from '@APP/controllers';

const NESTIA_CONFIG: nestia.INestiaConfig = {
    input: async () =>
        NestFactory.create(await Router.mount(), { logger: false }),
    output: './sdk',
    simulate: false,
    propagate: false,
    clone: true,
    primitive: true,
    json: false,
    swagger: {
        decompose: true,
        output: 'packages/api/swagger/swagger.json',
        servers: [
            { url: 'https://localhost:4000', description: 'Local Server' },
        ],
        security: {
            bearer: {
                type: 'http',
                scheme: 'bearer',
            },
        },
    },
};

export default NESTIA_CONFIG;
