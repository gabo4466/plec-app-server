import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';
import { Professor } from '../../professor';
@Injectable()
export class ProfessorFollowService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}

    async execute(mongoId: string, professor: Professor) {
        return this.professorRepository
            .follow(mongoId, professor)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                throw error;
            });
    }
}
