import { ProfessorCreateService } from '../../domain/users/services/professor/professor-create.service';
import { Injectable } from '@nestjs/common';
import { ProfessorCheckService } from '../../domain/users/services/professor/professor-check.service';

@Injectable()
export class ProfessorRegisterUseCase {
    constructor(
        private readonly professorCreateService: ProfessorCreateService,
        private readonly professorCheckService: ProfessorCheckService,
    ) {}

    execute() {
        this.professorCheckService.execute();
    }
}
