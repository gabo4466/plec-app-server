import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';
import { Professor } from '../../professor';

@Injectable()
export class ProfessorCreateService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}

    async execute(professor: Professor) {
        this.professorRepository
            .create(professor)
            .then((professor) => {
                return professor;
            })
            .catch((error) => {
                if (error) {
                    throw error;
                }
            });
    }
}
