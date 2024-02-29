import { IConnection } from '@nestia/fetcher';
import api from '@project/api';
import typia from 'typia';

export const test_health = async (connection: IConnection) => {
    const result = await api.functional.health.check(connection);
    typia.assertEquals(result);
};
