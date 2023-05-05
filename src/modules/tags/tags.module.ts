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
import { TagsFindByTermService } from 'src/domain/tags/services/tags-find-by-term.service';
import { TagsByUserUseCase } from 'src/application/tags/tags-by-user.use-case';
import { QuestionsModule } from '../questions/questions.module';

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
        TagsFindByTermService,

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
    exports: ['TagRepository', TagsFindByTermService],
})
export class TagsModule {}
