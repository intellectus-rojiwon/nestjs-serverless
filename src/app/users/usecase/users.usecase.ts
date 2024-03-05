import { ErrorCode } from '@SRC/common/error_code';
import { Regex } from '@SRC/common/regex';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersUsecase {
    get(user_id: Regex.UUID) {
        user_id;
        throw new NotFoundException({
            code: 'USER_NOT_FOUND' satisfies ErrorCode.UserNotFound,
        });
    }
}
