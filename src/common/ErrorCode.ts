export interface ErrorResponse<T> {
    readonly code: T;
    readonly message?: string;
}

export namespace ErrorCode {
    export type ArticleNotFound = 'Article Not Found';

    export type UserNotFound = 'User Not Found';
}
