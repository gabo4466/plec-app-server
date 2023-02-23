import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';

@Injectable()
export class ProfessorProfileService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}
    async execute(id: string) {
        return this.professorRepository
            .findOneByTerm(id)
            .then((professor) => {
                const newProfessor = professor.toObject();
                return newProfessor;
            })
            .catch((error) => {
                throw error;
            });
    }
}
