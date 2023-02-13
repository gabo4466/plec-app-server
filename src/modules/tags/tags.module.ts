import { Module } from '@nestjs/common';
import { TagCreateUseCase } from 'src/application/tags/tag-create.use-case';
import { TagsController } from 'src/infrastructure/tags/controllers/tags.controller';
import { UsersModule } from '../users/users.module';
import { TagCreateService } from 'src/domain/tags/services/tag-create.service';
import { MongooseTagRepository } from 'src/infrastructure/tags/repositories/mongoose-tag.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
    MongooseTagDto,
    TagSchema,
} from '../../infrastructure/tags/data-base-dtos/mongoose/mongoose-tag.dto';

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
        TagCreateService,

        // USE CASES
        TagCreateUseCase,

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
