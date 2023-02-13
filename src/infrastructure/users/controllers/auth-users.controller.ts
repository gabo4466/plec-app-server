import { Body, Controller, Get, Post } from '@nestjs/common';
import { Professor } from 'src/domain/users/professor';
import { ProfessorRegisterUseCase } from '../../../application/users/professor-register.use-case';
import { RegisterProfessorDto } from '../dto/register-professor.dto';
import { Auth } from '../decorators/auth.decorator';
import { LoginProfessorDto } from '../dto/login-professor.dto';
import { ProfessorLoginUseCase } from '../../../application/users/professor-login.use-case';

@Controller('auth')
export class AuthUsersController {
    constructor(
        private readonly professorRegisterUseCase: ProfessorRegisterUseCase,
        private readonly professorLoginUseCase: ProfessorLoginUseCase,
    ) {}

    @Post()
    async register(@Body() registerProfessorDto: RegisterProfessorDto) {
        const professor: Professor = new Professor();
        professor.setDataFromInt(registerProfessorDto);
        return await this.professorRegisterUseCase.execute(professor);
    }

    @Post('/login')
    async login(@Body() loginProfessorDto: LoginProfessorDto) {
        const professor: Professor = new Professor();
        professor.setDataFromInt(loginProfessorDto);
        return await this.professorLoginUseCase.execute(professor);
    }

    @Get('/prueba')
    @Auth()
    prueba() {
        return { no: 'no autorizado' };
    }
}
