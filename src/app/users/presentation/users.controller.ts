import core from '@nestia/core';
import * as nest from '@nestjs/common';

import { IUserGet } from '@APP/app/users/presentation/dto/Get';
import { UsersUsecase } from '@APP/app/users/usecase/users.usecase';
import { ErrorCode, ErrorResponse } from '@APP/common/ErrorCode';
import { Regex } from '@APP/common/Regex';

@nest.Controller('users')
export class UsersController {
    constructor(readonly usecase: UsersUsecase) {}

    /**
     * 사용자 정보를 불러옵니다.
     *
     * @summary 사용자 정보 보기
     * @tag users
     * @param user_id 게시글 id
     * @return 사용자 정보
     */
    @core.TypedException<ErrorResponse<ErrorCode.UserNotFound>>(
        nest.HttpStatus.NOT_FOUND,
    )
    @core.TypedRoute.Get(':user_id')
    async get(
        @core.TypedParam('user_id') user_id: Regex.UUID,
    ): Promise<IUserGet.IResponse> {
        this.usecase.get(user_id);
        return {};
    }
}
