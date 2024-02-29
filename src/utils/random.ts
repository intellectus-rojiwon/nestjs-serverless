import { randomInt, randomUUID } from 'crypto';
import typia from 'typia';

export namespace Random {
    export const uuid = (): string => randomUUID();
    /** `min <= n < max` */
    export const int = ({
        min = 0,
        max,
    }: {
        min?: number;
        max: number;
    }): number => randomInt(min, max);
    /** `0 <= n < max` */
    export const double = (max: number): number => Math.random() * max;
    export const string = (length: number) => {
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        return Array.from({ length }, () =>
            chars.charAt(int({ max: chars.length })),
        ).join('');
    };
    export const datetime = typia.createRandom<
        string & typia.tags.Format<'date-time'>
    >();
}
