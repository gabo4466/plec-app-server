import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Professor } from 'src/domain/users/professor';
import { ProfessorRepository } from '../../../domain/users/repositories/professor.repository';
import { MongooseProfessorDto } from '../data-base-dtos/mongoose/mongoose-professor.dto';
import { isValidObjectId, Model } from 'mongoose';
import { log } from 'console';

@Injectable()
export class MongooseProfessorRepository implements ProfessorRepository {
    constructor(
        @InjectModel(MongooseProfessorDto.name)
        private readonly professorModel: Model<MongooseProfessorDto>,
    ) {}

    private setDataFromProfessor(professor: Professor) {
        return {
            email: professor.email,
            bio: professor.bio,
            linkedin: professor.linkedin,
            password: professor.password,
            name: professor.name,
            roles: professor.roles,
        };
    }

    search(term: string, offset: number, limit: number): Promise<Professor[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const professors: Professor[] = [];
                const mongooseProfessors = await this.professorModel
                    .find({
                        $and: [
                            { name: { $regex: term, $options: 'i' } },
                            { isActive: true },
                            { isBanned: false },
                        ],
                    })
                    .skip(offset)
                    .limit(limit);
                mongooseProfessors.forEach((professor) => {
                    const newProfessor = new Professor();
                    newProfessor.setDataFromInt(professor);
                    professors.push(newProfessor);
                });
                resolve(professors);
            } catch (error) {
                reject(error);
            }
        });
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
                    const professor = new Professor();
                    professor.setDataFromInt(mongooseProfessor);
                    resolve(professor);
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
                const newProfessor = new Professor();
                newProfessor.setDataFromInt(mongooseProfessor);
                resolve(newProfessor);
            } catch (error) {
                reject(error);
            }
        });
    }
    update(professor: Professor): Promise<Professor> {
        return new Promise(async (resolve, reject) => {
            try {
                let mongooseProfessor: MongooseProfessorDto;
                mongooseProfessor = await this.professorModel.findByIdAndUpdate(
                    professor.id,
                    this.setDataFromProfessor(professor),
                    { new: true },
                );
                const newProfessor = new Professor();
                newProfessor.setDataFromInt(mongooseProfessor);
                resolve(newProfessor);
            } catch (error) {
                reject(error);
            }
        });
    }
    delete(id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.professorModel.findByIdAndUpdate(id, {
                    isBanned: true,
                });
                resolve(id);
            } catch (error) {
                reject(error);
            }
        });
    }

    follow(mongoId: string, professor: Professor): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) {
                reject(error);
            }
        });
    }
    unfollow(mongoId: string, professor: Professor): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
