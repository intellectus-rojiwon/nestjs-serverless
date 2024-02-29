import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ExceptionFilter } from './exception.filter';
import { DBModule } from './prisma';

@Module({
    imports: [DBModule],
    providers: [{ provide: APP_FILTER, useClass: ExceptionFilter }],
})
export class InfraModule {}
