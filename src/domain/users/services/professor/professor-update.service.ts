import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';
import { Professor } from 'src/domain/users/professor';

@Injectable()
export class ProfessorUpdateService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}

    async execute(professor: Professor) {
        return this.professorRepository
            .update(professor)
            .then((professor) => {
                return professor;
            })
            .catch((error) => {
                throw error;
            });
    }
}
