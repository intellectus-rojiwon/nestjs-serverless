import { Module } from '@nestjs/common';

import { ArticlesController } from './presentation/articles.controller';

@Module({
    controllers: [ArticlesController],
})
export class ArticlesModule {}
