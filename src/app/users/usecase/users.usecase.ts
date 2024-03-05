import { Injectable, NotFoundException } from '@nestjs/common';

import { ErrorCode } from '@APP/common/error_code';
import { Regex } from '@APP/common/regex';

@Injectable()
export class UsersUsecase {
    get(user_id: Regex.UUID) {
        user_id;
        throw new NotFoundException({
            code: 'USER_NOT_FOUND' satisfies ErrorCode.UserNotFound,
        });
    }
}
