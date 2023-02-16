import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Question from 'src/domain/questions/question';
import { QuestionRepository } from 'src/domain/questions/repositories/question.repository';
import { MongooseQuestionDto } from 'src/infrastructure/questions/data-base-dtos/mongoose/mongoose-question.dto';

@Injectable()
export class MongooseQuestionRepository implements QuestionRepository {
    constructor(
        @InjectModel(MongooseQuestionDto.name)
        private readonly mongooseQuestionModel: MongooseQuestionDto,
    ) {}

    create(obj: Question<any>): Promise<Question<any>> {
        throw new Error('Method not implemented.');
    }
    findOneByTerm(term: string): Promise<Question<any>> {
        throw new Error('Method not implemented.');
    }
    search(
        term: string,
        offset: number,
        limit: number,
    ): Promise<Question<any>[]> {
        throw new Error('Method not implemented.');
    }
    update(obj: Question<any>): Promise<Question<any>> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
