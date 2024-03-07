import { DynamicExecutor } from '@nestia/e2e';
import { IConnection } from '@nestia/fetcher';

export namespace Test {
    interface IOptions {
        connection: IConnection;
        skip?: string | undefined;
        only?: string | undefined;
    }

    /** 실제 테스트 함수를 실행하는 함수 */
    export const run = async ({
        connection,
        skip,
        only,
    }: IOptions): Promise<0 | -1> => {
        const report = await DynamicExecutor.validate({
            prefix: 'test_',
            parameters: () => [connection],
            filter: (name) => {
                if (skip !== undefined) return !name.includes(skip);
                if (only !== undefined) return name.includes(only);
                return true;
            },
            wrapper: async (_, closure) => {
                try {
                    await closure(connection);
                } catch (error) {
                    if (error instanceof Error) delete error.stack;
                    console.log(error);
                    throw error;
                }
            },
        })(__dirname + '/features');
        const executions = report.executions.filter(
            <T extends { error: Error | null }>(
                exe: T,
            ): exe is T & { error: Error } => exe.error !== null,
        );
        if (executions.length === 0) return 0;
        return -1;
    };
}
