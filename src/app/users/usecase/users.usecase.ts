import { Injectable } from '@nestjs/common';

import { Regex } from '@APP/common/Regex';
import { logger } from '@APP/infrastructure/winston';

@Injectable()
export class UsersUsecase {
    get(user_id: Regex.UUID) {
        user_id;
        const error = new Error('test error');
        logger.error(error);
        return {};
    }
}
