import { Body, Controller, Post } from '@nestjs/common';
import { Professor } from 'src/domain/users/professor';
import { ProfessorRegisterUseCase } from '../../../application/users/professor-register.use-case';
import { CreateProfessorDto } from '../dto/create-professor.dto';

@Controller('auth')
export class AuthUsersController {
    constructor(
        private readonly professorRegisterUseCase: ProfessorRegisterUseCase,
    ) {}

    @Post()
    async register(@Body() createProfessorDto: CreateProfessorDto) {
        let professor = createProfessorDto.converToProfessor();
        return await this.professorRegisterUseCase.execute(professor);
    }
}
