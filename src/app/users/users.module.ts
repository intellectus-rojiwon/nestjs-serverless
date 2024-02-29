import { Logger, Module } from '@nestjs/common';

import { UsersController } from './presentation/users.controller';
import { UsersUsecase } from './usecase/users.usecase';

@Module({
    providers: [Logger, UsersUsecase],
    controllers: [UsersController],
})
export class UsersModule {}
