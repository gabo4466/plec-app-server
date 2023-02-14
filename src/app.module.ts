import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './modules/common/common.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGOURL),
        UsersModule,
        TagsModule,
    ],
    providers: [],
})
export class AppModule {}
