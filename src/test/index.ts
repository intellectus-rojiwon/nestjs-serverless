import { IConnection } from '@nestia/fetcher';

import { Backend } from '@APP/backend';
import { Configuration } from '@APP/infrastructure/config';

import { Mocker } from './mocker';
import { Test } from './runner';

void (async () => {
    console.time('test time');
    Mocker.run();
    const app = await Backend.open();
    await app.listen(Configuration.PORT);
    const connection: IConnection = {
        host: `http://localhost:${Configuration.PORT}`,
    };

    const result = await Test.run({ connection });

    await app.close();
    console.timeEnd('test time');
    process.exit(result ? 0 : -1);
})();
