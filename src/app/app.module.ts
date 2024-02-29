import { Module } from '@nestjs/common';

import { InfraModule } from './../infrastructure/infra.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { SystemController } from './syetem.controller';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        InfraModule,
        UsersModule,
        AuthModule,
        BoardsModule,
        ArticlesModule,
    ],
    controllers: [SystemController],
})
export class AppModule {}
