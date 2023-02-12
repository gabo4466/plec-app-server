import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Professor } from 'src/domain/users/professor';
import { ProfessorRepository } from '../../../domain/users/repositories/professor.repository';
import { MongooseProfessorDto } from '../data-base-dtos/mongoose/mongoose-professor.dto';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class MongooseProfessorRepository implements ProfessorRepository {
    constructor(
        @InjectModel(MongooseProfessorDto.name)
        private readonly professorModel: Model<MongooseProfessorDto>,
    ) {}

    search(term: string): Promise<Professor> {
        throw new Error('Method not implemented.');
    }
    findOneByTerm(term: string): Promise<Professor> {
        return new Promise(async (resolve, reject) => {
            try {
                let mongooseProfessor: MongooseProfessorDto;
                // MongoID
                if (isValidObjectId(term)) {
                    mongooseProfessor = await this.professorModel.findById(
                        term,
                    );
                }
                // Email
                if (!mongooseProfessor) {
                    mongooseProfessor = await this.professorModel.findOne({
                        email: term.toLowerCase().trim(),
                    });
                }
                // throw new Error();
                if (!mongooseProfessor) {
                    reject();
                } else {
                    resolve(mongooseProfessor.converToProfessor());
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    create(professor: Professor): Promise<Professor> {
        throw new Error('Method not implemented.');
    }
    getAll(offset: number, limit: number): Promise<Professor[]> {
        throw new Error('Method not implemented.');
    }
    update(professor: Professor): Promise<Professor> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
