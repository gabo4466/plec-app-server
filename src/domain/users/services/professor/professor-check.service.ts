import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';
import { Professor } from '../../professor';

@Injectable()
export class ProfessorCheckService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}

    /**
     * Checks if email is already registered
     * @param professor
     * @returns
     * false: email doesnt exist in database
     * true email exists
     */
    async execute(term: string) {
        return this.professorRepository
            .findOneByTerm(term)
            .then((professor) => {
                return professor;
            })
            .catch((error) => {
                if (error) {
                    throw error;
                } else {
                    return;
                }
            });
    }
}
