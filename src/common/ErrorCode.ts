export interface ErrorResponse<T> {
    readonly code: T;
    readonly message?: string;
}

export namespace ErrorCode {
    export type ArticleNotFound = 'ARTICLE_NOT_FOUND';

    export type UserNotFound = 'USER_NOT_FOUND';

    export type BoardNotFound = 'BOARD_NOT_FOUND';
}
