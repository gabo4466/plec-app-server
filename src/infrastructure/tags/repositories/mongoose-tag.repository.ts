import { TagRepository } from 'src/domain/tags/repositories/tag.repository';
import { Tag } from 'src/domain/tags/tag';
import { Professor } from 'src/domain/users/professor';
import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from 'src/domain/users/repositories/professor.repository';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseTagDto } from '../data-base-dtos/mongoose/mongoose-tag.dto';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class MongooseTagRepository implements TagRepository {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
        @InjectModel(MongooseTagDto.name)
        private readonly tagModel: Model<MongooseTagDto>,
    ) {}

    private setDataFromTag(tag: Tag) {
        return {
            color: tag.color,
            name: tag.name,
        };
    }

    create(tag: Tag, professor: Professor): Promise<Tag> {
        return new Promise(async (resolve, reject) => {
            try {
                let mongooseProfessor =
                    await this.professorRepository.findOneByTerm(professor.id);
                const mongooseTag = await this.tagModel.create({
                    ...this.setDataFromTag(tag),
                    professor: mongooseProfessor,
                });
                const newTag = new Tag();
                newTag.setDataFromInt(mongooseTag);
                resolve(newTag);
            } catch (error) {
                reject(error);
            }
        });
        throw new Error('Method not implemented.');
    }
    findOneByTerm(term: string): Promise<Tag> {
        return new Promise(async (resolve, reject) => {
            try {
                let mongooseTag: MongooseTagDto;
                if (isValidObjectId(term)) {
                    mongooseTag = await this.tagModel.findById(term);
                }

                if (!mongooseTag) {
                    mongooseTag = await this.tagModel.findOne({
                        name: term.toLowerCase().trim(),
                    });
                }

                if (!mongooseTag) {
                    reject();
                } else {
                    const tag = new Tag();
                    tag.setDataFromInt(mongooseTag);
                    resolve(tag);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    search(term: string, offset: number, limit: number): Promise<Tag[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let tags: Tag[] = [];
                const mongooseTags = await this.tagModel
                    .find({
                        name: {
                            $regex: term,
                            $options: 'i',
                        },
                    })
                    .skip(offset)
                    .limit(limit);

                mongooseTags.forEach((mongooseTag) => {
                    const tag = new Tag();
                    tag.setDataFromInt(mongooseTag);
                    tags.push(tag);
                });
                resolve(tags);
            } catch (error) {
                reject(error);
            }
        });
    }
    delete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
