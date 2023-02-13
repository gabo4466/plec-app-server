import { Module } from '@nestjs/common';
import { TagCreateUseCase } from 'src/application/tags/tag-create.use-case';
import { TagsController } from 'src/infrastructure/tags/controllers/tags.controller';

@Module({
    providers: [TagCreateUseCase],
    controllers: [TagsController],
})
export class TagsModule {}
