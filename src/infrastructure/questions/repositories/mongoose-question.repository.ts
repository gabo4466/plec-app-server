import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { MultipleSelectionQuestion } from 'src/domain/questions/multiple-selection-question';
import { OrderQuestion } from 'src/domain/questions/order-question';
import Question from 'src/domain/questions/question';
import { QuestionsRepository } from 'src/domain/questions/repositories/questions.repository';
import { SimpleSelectionQuestion } from 'src/domain/questions/simple-selection-question';
import { TrueFalseQuestion } from 'src/domain/questions/true-false-question';
import { WrittenQuestion } from 'src/domain/questions/written-question';
import { Tag } from 'src/domain/tags/tag';
import { Professor } from 'src/domain/users/professor';
import { MongooseQuestionDto } from 'src/infrastructure/questions/data-base-dtos/mongoose/mongoose-question.dto';

@Injectable()
export class MongooseQuestionRepository implements QuestionsRepository {
    constructor(
        @InjectModel(MongooseQuestionDto.name)
        private readonly mongooseQuestionModel: Model<MongooseQuestionDto>,
    ) {}

    findByProfessor(professor: Professor) {
        return new Promise(async (resolve, reject) => {
            try {
                const mongooseQuestions: MongooseQuestionDto[] =
                    await this.mongooseQuestionModel
                        .find({ professor: professor.id })
                        .populate('professor', 'name email _id')
                        .populate('tags');
                const questions: Question<any>[] = mongooseQuestions.map(
                    (mongooseQuestion) => {
                        return this.instantiateQuestionFromMongooseQuestion(
                            mongooseQuestion,
                        );
                    },
                );
                resolve(questions);
            } catch (error) {
                reject(error);
            }
        });
    }

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
            type: question.type,
        };
    }

    private instantiateQuestionFromMongooseQuestion(
        mongooseQuestion: MongooseQuestionDto,
    ) {
        let question: Question<any>;
        if (mongooseQuestion.type === 'multiple-selection') {
            question = new MultipleSelectionQuestion();
        } else if (mongooseQuestion.type === 'true-false') {
            question = new TrueFalseQuestion();
        } else if (mongooseQuestion.type === 'simple-selection') {
            question = new SimpleSelectionQuestion();
        } else if (mongooseQuestion.type === 'order') {
            question = new OrderQuestion();
        } else if (mongooseQuestion.type === 'written') {
            question = new WrittenQuestion();
        }
        question.setDataFromInt(mongooseQuestion);
        return question;
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
        return new Promise(async (resolve, reject) => {
            try {
                let mongooseQuestion: MongooseQuestionDto;
                if (isValidObjectId(term)) {
                    mongooseQuestion = await this.mongooseQuestionModel
                        .findById(term)
                        .populate('professor', 'name email _id')
                        .populate('tags');
                }
                if (!mongooseQuestion) {
                    reject();
                } else {
                    let question: Question<any> =
                        this.instantiateQuestionFromMongooseQuestion(
                            mongooseQuestion,
                        );
                    resolve(question);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    search(
        term: string,
        offset: number,
        limit: number,
    ): Promise<Question<any>[]> {
        throw new Error('Method not implemented.');
    }
    update(question: Question<any>): Promise<Question<any>> {
        return new Promise(async (resolve, reject) => {
            try {
                const mongooseQuestion: MongooseQuestionDto =
                    await this.mongooseQuestionModel.findByIdAndUpdate(
                        question.id,
                        {
                            ...this.setDataFromQuestion(question),
                        },
                        { new: true },
                    );
                question.setDataFromInt(mongooseQuestion);
                resolve(question);
            } catch (error) {
                reject(error);
            }
        });
    }
    delete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    searchByProfessorAndTag(
        professor: Professor,
        tag: Tag,
        offset: number,
        limit: number,
    ): Promise<Question<any>[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const mongooseQuestions: MongooseQuestionDto[] =
                    await this.mongooseQuestionModel
                        .find({
                            professor: professor.id,
                            tags: tag.id,
                        })
                        .populate('professor', 'name email _id')
                        .populate('tags')
                        .skip(offset)
                        .limit(limit);
                const questions: Question<any>[] = mongooseQuestions.map(
                    (mongooseQuestion) => {
                        return this.instantiateQuestionFromMongooseQuestion(
                            mongooseQuestion,
                        );
                    },
                );
                resolve(questions);
            } catch (error) {
                reject(error);
            }
        });
    }
}
