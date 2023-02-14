import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';
import { Professor } from '../../professor';
@Injectable()
export class ProfessorFollowService {
    constructor(
        @Inject()
        private readonly professorRepository: ProfessorRepository,
    ) {}

    execute(mongoId: string, professor: Professor) {
        this.professorRepository.follow(mongoId, professor);
    }
}
