import { Backend } from './backend';
import { Configuration } from './infrastructure/config';
import { logger } from './infrastructure/logger';

const bootstrap = () =>
    Backend.open({
        logger,
        cors: { credentials: false },
    }).then((app) => app.listen(Configuration.PORT));

void bootstrap();
