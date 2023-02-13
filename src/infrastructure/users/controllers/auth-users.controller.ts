import { Body, Controller, Post } from '@nestjs/common';
import { ProfessorRegisterUseCase } from '../../../application/users/professor-register.use-case';
import { RegisterProfessorDto } from '../dto/register-professor.dto';
import { InfrastructureProfessor } from '../infrastructure-classes/infrastructure-professor';
import { LoginProfessorDto } from '../dto/login-professor.dto';
import { ProfessorLoginUseCase } from '../../../application/users/professor-login.use-case';
import { Professor } from 'src/domain/users/professor';

@Controller('auth')
export class AuthUsersController {
    constructor(
        private readonly professorRegisterUseCase: ProfessorRegisterUseCase,
        private readonly professorLoginUseCase: ProfessorLoginUseCase,
    ) {}

    @Post()
    async register(@Body() registerProfessorDto: RegisterProfessorDto) {
        const professor: Professor = new InfrastructureProfessor(
            registerProfessorDto,
        );
        return await this.professorRegisterUseCase.execute(professor);
    }

    @Post('/login')
    async login(@Body() loginProfessorDto: LoginProfessorDto) {
        //TODO: retornar JWT
        const professor: Professor = new InfrastructureProfessor(
            loginProfessorDto,
        );
        return await this.professorLoginUseCase.execute(professor);
    }
}
