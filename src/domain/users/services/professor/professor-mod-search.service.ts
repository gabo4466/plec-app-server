import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';

@Injectable()
export class ProfessorModSearchService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}

    async execute(
        term: string,
        offset: number,
        limit: number,
        isActive: boolean,
        isBanned: boolean,
        isVerified: boolean,
    ) {
        return this.professorRepository
            .modSearch(term, offset, limit, isActive, isBanned, isVerified)
            .then((professors) => {
                return professors;
            })
            .catch((error) => {
                throw error;
            });
    }
}
