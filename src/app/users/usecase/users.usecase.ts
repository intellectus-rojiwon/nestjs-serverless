import { HttpStatus, Injectable } from '@nestjs/common';

import { Exception } from '@SRC/common/exception';
import { Regex } from '@SRC/common/regex';

@Injectable()
export class UsersUsecase {
    get(user_id: Regex.UUID) {
        user_id;
        throw new Exception<Exception.User.NotFound>(
            { code: 'USER_NOT_FOUND' },
            HttpStatus.NOT_FOUND,
        );
    }
}
