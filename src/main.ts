import { Backend } from './backend';
import { logger } from './infrastructure/logger';

const bootstrap = () =>
    Backend.create({
        logger,
        cors: { credentials: false },
    })
        .then((app) => app.open())
        .catch(logger.fatal);

void bootstrap();
