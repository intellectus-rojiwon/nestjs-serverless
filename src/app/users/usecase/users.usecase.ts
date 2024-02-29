import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';

import { Regex } from '@APP/common/Regex';

@Injectable()
export class UsersUsecase {
    constructor(@Inject(Logger) private readonly logger: LoggerService) {}
    get(user_id: Regex.UUID) {
        user_id;
        const error = new Error('test error');
        this.logger.debug ? this.logger.debug(error) : null;
        this.logger.error(error);
        this.logger.log(error);
        this.logger.verbose ? this.logger.verbose(error) : null;
        this.logger.warn(error);
        return {};
    }
}
