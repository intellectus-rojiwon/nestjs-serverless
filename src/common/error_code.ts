export interface ErrorCode<T extends string> {
    readonly code: T;
    readonly message?: string;
}

export namespace ErrorCode {
    export type ArticleNotFound = ErrorCode<'ARTICLE_NOT_FOUND'>;

    export type UserNotFound = ErrorCode<'USER_NOT_FOUND'>;

    export type BoardNotFound = ErrorCode<'BOARD_NOT_FOUND'>;
}
