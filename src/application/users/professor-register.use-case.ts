import { Inject } from '@nestjs/common';
import { ProfessorCreateService } from '../../domain/users/services/professor/professor-create.service';
export class ProfessorRegisterUseCase {
    constructor(
        private readonly professorCreateService: ProfessorCreateService,
    ) {}

    execute() {}
}
