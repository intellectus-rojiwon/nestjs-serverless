import { mock } from 'node:test';

export namespace Mocker {
    type MethodNames<T extends object> = {
        [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
    }[keyof T];

    /** 구현된 모듈 메소드를 mocking */
    export const implement = <T extends object, M extends MethodNames<T>>(
        module: T,
        methodName: M,
        fn: T[M],
        times = Infinity,
    ): void => {
        restore(module, methodName);
        mock.method(module, methodName, fn as any, { times });
    };

    /** mocking한 모듈 메소드를 restore */
    export const restore = <T extends object, M extends MethodNames<T>>(
        module: T,
        methodName: M,
    ) => {
        const mocker = (module[methodName] as any)['mock'];
        if (mocker == undefined) return;
        mocker['restore']();
    };

    export const run = () => {
        // 모킹할 함수들을 입력
    };
}
