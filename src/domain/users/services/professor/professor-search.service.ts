import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';

@Injectable()
export class ProfessorSearchService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}

    async execute(term: string, offset: number, limit: number) {
        return this.professorRepository
            .search(term, offset, limit)
            .then((professors) => {
                return professors;
            })
            .catch((error) => {
                throw error;
            });
    }
}
