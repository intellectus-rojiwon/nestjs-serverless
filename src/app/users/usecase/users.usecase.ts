import { Injectable, NotFoundException } from '@nestjs/common';

import { ErrorCode } from '@APP/common/ErrorCode';
import { Regex } from '@APP/common/Regex';
import { logger } from '@APP/infrastructure/winston';

@Injectable()
export class UsersUsecase {
    get(user_id: Regex.UUID) {
        user_id;

        logger.error(
            new NotFoundException({
                code: 'User Not Found' satisfies ErrorCode.UserNotFound,
            }),
        );
        return {};
    }
}
