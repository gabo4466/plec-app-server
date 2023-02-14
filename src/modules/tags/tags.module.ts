import { Module } from '@nestjs/common';
import { TagsCreateUseCase } from 'src/application/tags/tags-create.use-case';
import { TagsController } from 'src/infrastructure/tags/controllers/tags.controller';
import { UsersModule } from '../users/users.module';
import { TagsCreateService } from 'src/domain/tags/services/tags-create.service';
import { MongooseTagRepository } from 'src/infrastructure/tags/repositories/mongoose-tag.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsSearchUseCase } from '../../application/tags/tags-search.use-case';
import {
    MongooseTagDto,
    TagSchema,
} from '../../infrastructure/tags/data-base-dtos/mongoose/mongoose-tag.dto';
import { TagsSearchService } from 'src/domain/tags/services/tags-search.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: MongooseTagDto.name,
                schema: TagSchema,
                collection: 'tag',
            },
        ]),
        UsersModule,
    ],
    providers: [
        // SERVICES
        TagsCreateService,
        TagsSearchService,

        // USE CASES
        TagsCreateUseCase,
        TagsSearchUseCase,

        // REPOSITORIES
        {
            provide: 'TagRepository',
            useClass: MongooseTagRepository,
        },
    ],
    controllers: [TagsController],
    exports: ['TagRepository'],
})
export class TagsModule {}
