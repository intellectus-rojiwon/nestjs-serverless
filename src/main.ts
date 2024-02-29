import { Backend } from './backend';
import { Configuration } from './infrastructure/config';

const bootstrap = () =>
    Backend.open({
        cors: { credentials: false },
    }).then((app) => app.listen(Configuration.PORT));

void bootstrap();
