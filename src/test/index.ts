import { Backend } from '@SRC/backend';
import { Configuration } from '@SRC/infrastructure/config';
import { IConnection } from '@nestia/fetcher';

import { Mocker } from './mocker';
import { Test } from './runner';

const getArg = (key: string): string | undefined => {
    const key_index = process.argv.findIndex((val) => val === key);
    if (key_index === -1 || key_index + 1 >= process.argv.length)
        return undefined;
    return process.argv[key_index + 1]!;
};

void (async () => {
    Mocker.run();
    const app = await Backend.create({ logger: false });
    await app.open();
    const connection: IConnection = {
        host: `http://localhost:${Configuration.PORT}`,
    };
    const skip = getArg('--skip');
    const only = getArg('--only');
    const result = await Test.run({
        connection,
        skip,
        only,
    });

    await app.close();
    process.exit(result);
})();
