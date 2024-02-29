import { Backend } from './backend';
import { Configuration } from './infrastructure/config';
import { WinstonLogger } from './infrastructure/winston';

const bootstrap = () =>
    Backend.open({
        logger: WinstonLogger,
        cors: { credentials: false },
    }).then((app) => app.listen(Configuration.PORT));

void bootstrap();
