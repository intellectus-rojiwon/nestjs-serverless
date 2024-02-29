import core from '@nestia/core';
import * as nest from '@nestjs/common';

import { IArticleGet } from '@APP/app/article/dto/Get';
import { IArticleGetList } from '@APP/app/article/dto/GetList';
import { ErrorCode, ErrorResponse } from '@APP/common/ErrorCode';
import { Regex } from '@APP/common/Regex';

@nest.Controller('articles')
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
        @core.TypedQuery() query: IArticleGetList.ISearch,
    ): Promise<IArticleGetList.IResponse> {
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
        @core.TypedParam('article_id') article_id: Regex.UUID,
    ): Promise<IArticleGet.IResponse> {
        article_id;
        throw Error();
    }
}
