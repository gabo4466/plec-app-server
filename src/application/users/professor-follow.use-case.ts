import { Injectable } from '@nestjs/common';
import { Professor } from 'src/domain/users/professor';
import { ProfessorFollowService } from '../../domain/users/services/professor/professor-follow.service';

@Injectable()
export class ProfessorFollowUseCase {
    constructor(
        private readonly professorFollowService: ProfessorFollowService,
    ) {}

    execute(mongoId: string, professor: Professor) {
        this.professorFollowService.execute(mongoId, professor);
    }
}
