import { Body, Controller, Post } from '@nestjs/common';
import { ProfessorRegisterUseCase } from '../../../application/users/professor-register.use-case';
import { CreateProfessorDto } from '../dto/create-professor.dto';
import { InfrastructureProfessor } from '../infrastructure-classes/infrastructure-professor';
import { LoginProfessorDto } from '../dto/login-professor.dto';
import { ProfessorLoginUseCase } from '../../../application/users/professor-login.use-case';

@Controller('auth')
export class AuthUsersController {
    constructor(
        private readonly professorRegisterUseCase: ProfessorRegisterUseCase,
        private readonly professorLoginUseCase: ProfessorLoginUseCase,
    ) {}

    @Post()
    async register(@Body() createProfessorDto: CreateProfessorDto) {
        let professor: Professor = new InfrastructureProfessor(
            createProfessorDto,
        );
        return await this.professorRegisterUseCase.execute(professor);
    }

    @Post('/login')
    async login(@Body() loginProfessorDto: LoginProfessorDto) {
        //TODO: retornar JWT
        const professor = loginProfessorDto.converToProfessor();
        return await this.professorLoginUseCase.execute(professor);
    }
}
