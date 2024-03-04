import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';

import { Regex } from '@APP/common/Regex';
import { logger } from '@APP/infrastructure/winston';

@Injectable()
export class UsersUsecase {
    constructor(
        @Inject(Logger) private readonly loggerService: LoggerService,
    ) {}
    get(user_id: Regex.UUID) {
        user_id;
        const error = new Error('test error');
        this.loggerService.error(error);
        logger.error(error);
        return {};
    }
}
