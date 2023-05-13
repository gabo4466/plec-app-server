import { Module } from '@nestjs/common';
import { QuestionsModule } from '../questions/questions.module';
import { UsersModule } from '../users/users.module';
import { TagsModule } from './tags.module';
import { TagsByUserUseCase } from 'src/application/tags/tags-by-user.use-case';
import { TagsUserController } from 'src/infrastructure/tags/controllers/tags-user.controller';

@Module({
    imports: [UsersModule, QuestionsModule, TagsModule],
    providers: [
        // Use Cases
        TagsByUserUseCase,
        // Services
    ],
    controllers: [
        // Controllers
        TagsUserController,
    ],
})
export class TagsQuestionsModule {}
