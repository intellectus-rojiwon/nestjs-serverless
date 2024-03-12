import core from '@nestia/core';
import * as nest from '@nestjs/common';

import { Exception } from '@SRC/common/exception';
import { Regex } from '@SRC/common/regex';

import { IBoardGet } from './dto/get';

@nest.Controller('boards')
export class BoardsController {
    @core.TypedException<Exception.Board.NotFound>(nest.HttpStatus.NOT_FOUND)
    @core.TypedRoute.Get(':board_id')
    get(
        @core.TypedParam('board_id') board_id: Regex.UUID,
    ): Promise<IBoardGet.IResponse> {
        board_id;
        throw Error();
    }
}
