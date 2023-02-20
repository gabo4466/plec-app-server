import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './modules/common/common.module';
import { TagsModule } from './modules/tags/tags.module';
import { QuestionsModule } from './modules/questions/questions.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGOURL),
        UsersModule,
        TagsModule,
        QuestionsModule,
    ],
    providers: [],
})
export class AppModule {}
