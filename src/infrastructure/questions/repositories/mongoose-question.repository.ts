import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Question from 'src/domain/questions/question';
import { QuestionRepository } from 'src/domain/questions/repositories/question.repository';
import { MongooseQuestionDto } from 'src/infrastructure/questions/data-base-dtos/mongoose/mongoose-question.dto';

@Injectable()
export class MongooseQuestionRepository implements QuestionRepository {
    constructor(
        @InjectModel(MongooseQuestionDto.name)
        private readonly mongooseQuestionModel: Model<MongooseQuestionDto>,
    ) {}

    private setDataFromQuestion(question: Question<any>) {
        return {
            description: question.description,
            image: question.image,
            difficulty: question.difficulty,
            answers: question.answers.map((answer) => {
                return {
                    text: answer.text,
                    val: answer.val,
                };
            }),
            professor: question.professor.id,
            tags: question.tags,
        };
    }

    create(question: Question<any>): Promise<Question<any>> {
        return new Promise(async (resolve, reject) => {
            try {
                const mongooseQuestion: MongooseQuestionDto =
                    await this.mongooseQuestionModel.create({
                        ...this.setDataFromQuestion(question),
                    });

                question.setDataFromInt(mongooseQuestion);
                resolve(question);
            } catch (error) {
                reject(error);
            }
        });
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
    update(question: Question<any>): Promise<Question<any>> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
