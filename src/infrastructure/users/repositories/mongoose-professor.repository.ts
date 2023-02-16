import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Professor } from 'src/domain/users/professor';
import { ProfessorRepository } from '../../../domain/users/repositories/professor.repository';
import { MongooseProfessorDto } from '../data-base-dtos/mongoose/mongoose-professor.dto';
import mongoose, { isValidObjectId, Model, ObjectId } from 'mongoose';

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
                            { isVerified: true },
                        ],
                    })
                    .select('id name email bio linkedin')
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
    modSearch(
        term: string,
        offset: number,
        limit: number,
        isActive: boolean = true,
        isBanned: boolean = false,
        isVerified: boolean = true,
    ): Promise<Professor[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const professors: Professor[] = [];
                const mongooseProfessors = await this.professorModel
                    .find({
                        $and: [
                            { name: { $regex: term, $options: 'i' } },
                            { isActive: isActive },
                            { isBanned: isBanned },
                            { isVerified: isVerified },
                        ],
                    })
                    .select('id name email bio linkedin')
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
            //TODO: implent transaction

            try {
                if (
                    !isValidObjectId(mongoId) ||
                    !isValidObjectId(professor.id.toString())
                ) {
                    console.log('error1');
                    throw new Error('Invalid ID');
                }

                if (mongoId === professor.id.toString()) {
                    console.log('error');
                    throw new Error('You cannot follow yourself');
                }

                await this.professorModel.findByIdAndUpdate(
                    professor.id,
                    {
                        $addToSet: { followed: mongoId },
                    },
                    { new: true },
                );

                await this.professorModel.findByIdAndUpdate(
                    mongoId,
                    {
                        $addToSet: { followers: professor.id },
                    },
                    { new: true },
                );

                resolve();
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
    unfollow(mongoId: string, professor: Professor): Promise<void> {
        throw new Error('Method not implemented.');
    }
    activate(id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.professorModel.findByIdAndUpdate(id, {
                    isActive: true,
                });
                resolve(id);
            } catch (error) {
                reject(error);
            }
        });
    }
    verify(id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.professorModel.findByIdAndUpdate(id, {
                    isVerified: true,
                });
                resolve(id);
            } catch (error) {
                reject(error);
            }
        });
    }
    roleUpdate(id: string, role: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let mongooseProfessor: MongooseProfessorDto;
                mongooseProfessor = await this.professorModel.findByIdAndUpdate(
                    id,
                    {
                        $addToSet: { roles: role },
                    },
                    { new: true },
                );
                resolve(id);
            } catch (error) {
                reject(error);
            }
        });
    }
}
