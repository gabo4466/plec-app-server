import { Controller, Post } from '@nestjs/common';
import { ProfessorRegisterUseCase } from '../../../application/users/professor-register.use-case';

@Controller('auth')
export class AuthUsersController {
    constructor(
        private readonly professorRegisterUseCase: ProfessorRegisterUseCase,
    ) {}

    @Post()
    register() {
        return this.professorRegisterUseCase.execute();
    }
}
