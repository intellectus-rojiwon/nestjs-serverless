import core from '@nestia/core';
import * as nest from '@nestjs/common';

import { ErrorCode, ErrorResponse } from '@APP/common/ErrorCode';
import { Regex } from '@APP/common/Regex';

import { IBoardGet } from './dto/Get';

@nest.Controller('boards')
export class BoardsController {
    @core.TypedException<ErrorResponse<ErrorCode.BoardNotFound>>(
        nest.HttpStatus.NOT_FOUND,
    )
    @core.TypedRoute.Get(':board_id')
    get(
        @core.TypedParam('board_id') board_id: Regex.UUID,
    ): Promise<IBoardGet.IResponse> {
        board_id;
        throw Error();
    }
}
