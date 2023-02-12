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
        await this.professorRepository.create(professor);
    }
}
