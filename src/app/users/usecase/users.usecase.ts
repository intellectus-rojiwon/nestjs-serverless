import { Injectable, NotFoundException } from '@nestjs/common';

import { ErrorCode } from '@APP/common/ErrorCode';
import { Regex } from '@APP/common/Regex';

@Injectable()
export class UsersUsecase {
    get(user_id: Regex.UUID) {
        user_id;
        throw new NotFoundException({
            code: 'USER_NOT_FOUND' satisfies ErrorCode.UserNotFound,
        });
    }
}
