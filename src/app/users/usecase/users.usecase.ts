import { Injectable } from '@nestjs/common';

import { Regex } from '@APP/common/Regex';

@Injectable()
export class UsersUsecase {
    get(user_id: Regex.UUID) {
        console.log(user_id);
        return {};
    }
}
