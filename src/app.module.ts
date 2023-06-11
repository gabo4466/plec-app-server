import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { TagsModule } from './modules/tags/tags.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { GamesModule } from './modules/games/games.module';
import { TagsQuestionsModule } from './modules/tags/tags-questions.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGOURL),
        UsersModule,
        TagsModule,
        QuestionsModule,
        GamesModule,
        TagsQuestionsModule,
    ],
    providers: [],
})
export class AppModule {}
