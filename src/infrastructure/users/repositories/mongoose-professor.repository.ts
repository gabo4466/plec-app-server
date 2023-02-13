import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Professor } from 'src/domain/users/professor';
import { ProfessorRepository } from '../../../domain/users/repositories/professor.repository';
import { MongooseProfessorDto } from '../data-base-dtos/mongoose/mongoose-professor.dto';
import { isValidObjectId, Model } from 'mongoose';
import { InfrastructureProfessor } from '../infrastructure-classes/infrastructure-professor';

@Injectable()
export class MongooseProfessorRepository implements ProfessorRepository {
    constructor(
        @InjectModel(MongooseProfessorDto.name)
        private readonly professorModel: Model<MongooseProfessorDto>,
    ) {}

    setDataFromProfessor(professor: Professor) {
        return {
            email: professor.email,
            bio: professor.bio,
            linkedin: professor.linkedin,
            password: professor.password,
            name: professor.name,
            roles: professor.roles,
        };
    }

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
                if (!mongooseProfessor) {
                    reject();
                } else {
                    const professorInfrastructure = new InfrastructureProfessor(
                        mongooseProfessor,
                    );
                    resolve(professorInfrastructure);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    create(professor: Professor): Promise<Professor> {
        return new Promise(async (resolve, reject) => {
            try {
                let mongooseProfessor: MongooseProfessorDto;
                mongooseProfessor = await this.professorModel.create(
                    this.setDataFromProfessor(professor),
                );
                let professorInfrastructure = new InfrastructureProfessor(
                    mongooseProfessor,
                );
                resolve(professorInfrastructure);
            } catch (error) {
                reject(error);
            }
        });
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
