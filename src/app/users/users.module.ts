import { Module } from '@nestjs/common';

import { UsersController } from './presentation/users.controller';
import { UsersUsecase } from './usecase/users.usecase';

@Module({
    providers: [UsersUsecase],
    controllers: [UsersController],
})
export class UsersModule {}
