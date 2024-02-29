import { Module } from '@nestjs/common';

import { BoardsController } from './presentation/boards.controller';

@Module({
    controllers: [BoardsController],
})
export class BoardsModule {}
