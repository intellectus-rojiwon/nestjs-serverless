import { IConnection } from '@nestia/fetcher';

import { Backend } from '@APP/backend';
import { Configuration } from '@APP/infrastructure/config';

import { Mocker } from './mocker';
import { Test } from './runner';

const getArg = (key: string): string | null => {
    const key_index = process.argv.findIndex((val) => val === key);
    if (key_index === -1 || key_index + 1 >= process.argv.length) return null;
    return process.argv[key_index + 1]!;
};

void (async () => {
    console.time('test time');
    Mocker.run();
    const app = await Backend.open({ logger: false });
    await app.listen(Configuration.PORT);
    const connection: IConnection = {
        host: `http://localhost:${Configuration.PORT}`,
    };
    const skip = getArg('--skip');
    const only = getArg('--only');
    const result = await Test.run({
        connection,
        ...(skip ? { skip } : {}),
        ...(only ? { only } : {}),
    });

    await app.close();
    console.timeEnd('test time');
    process.exit(result ? 0 : -1);
})();
