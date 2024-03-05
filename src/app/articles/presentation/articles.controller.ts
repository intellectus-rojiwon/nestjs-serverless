import { IArticleGet } from '@SRC/app/articles/presentation/dto/get';
import { IArticleGetList } from '@SRC/app/articles/presentation/dto/get_list';
import { ErrorCode, ErrorResponse } from '@SRC/common/error_code';
import { Regex } from '@SRC/common/regex';
import core from '@nestia/core';
import * as nest from '@nestjs/common';

@nest.Controller('boards/:board_id/articles')
export class ArticlesController {
    /**
     * 게시글 목록을 불러옵니다.
     *
     * @summary 게시글 목록 보기
     * @tag articles
     * @return 게시글 목록
     */
    @core.TypedRoute.Get()
    async getList(
        @core.TypedParam('board_id') board_id: Regex.UUID,
        @core.TypedQuery() query: IArticleGetList.ISearch,
    ): Promise<IArticleGetList.IResponse> {
        board_id;
        query;
        throw Error();
    }

    /**
     * 게시글 상세 정보를 볼 수 있습니다.
     *
     * @summary 게시글 상세 보기
     * @tag articles
     * @param article_id 게시글 id
     * @return 게시글 상세 정보
     */
    @core.TypedException<ErrorResponse<ErrorCode.ArticleNotFound>>(
        nest.HttpStatus.NOT_FOUND,
    )
    @core.TypedRoute.Get(':article_id')
    async get(
        @core.TypedParam('board_id') board_id: Regex.UUID,
        @core.TypedParam('article_id') article_id: Regex.UUID,
    ): Promise<IArticleGet.IResponse> {
        board_id;
        article_id;
        throw Error();
    }
}
