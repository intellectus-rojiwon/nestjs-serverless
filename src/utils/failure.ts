export class Failure<T extends string> extends Error {
    override readonly name: 'InternalFailure';
    constructor(
        readonly status: string | number,
        override readonly message: T,
        override readonly cause?: string,
    ) {
        super(message, { cause });
        this.name = 'InternalFailure';
    }
}
