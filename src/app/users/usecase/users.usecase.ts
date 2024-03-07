import { Regex } from '@SRC/common/_regex';
import { ErrorCode } from '@SRC/common/error_code';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersUsecase {
    get(user_id: Regex.UUID) {
        user_id;
        throw new NotFoundException({
            code: 'USER_NOT_FOUND',
        } satisfies ErrorCode.UserNotFound);
    }
}
