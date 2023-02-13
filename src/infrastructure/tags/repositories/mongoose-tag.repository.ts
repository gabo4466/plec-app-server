import { TagRepository } from 'src/domain/tags/repositories/tag.repository';
import { Tag } from 'src/domain/tags/tag';
import { Professor } from 'src/domain/users/professor';
import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from 'src/domain/users/repositories/professor.repository';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseTagDto } from '../data-base-dtos/mongoose/mongoose-tag.dto';
import { Model } from 'mongoose';

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
                console.log('buscamos profesor');
                console.log(mongooseProfessor);

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
        throw new Error('Method not implemented.');
    }
    search(term: string): Promise<Tag> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
