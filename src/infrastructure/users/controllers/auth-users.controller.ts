import { Body, Controller, Get, Post } from '@nestjs/common';
import { Professor } from 'src/domain/users/professor';
import { ProfessorRegisterUseCase } from '../../../application/users/professor-register.use-case';
import { Auth } from '../decorators/auth.decorator';
import { CreateProfessorDto } from '../dto/create-professor.dto';
import { InfrastructureProfessor } from '../infrastructure-classes/infrastructure-professor';

@Controller('auth')
export class AuthUsersController {
    constructor(
        private readonly professorRegisterUseCase: ProfessorRegisterUseCase,
    ) {}

    @Post()
    async register(@Body() createProfessorDto: CreateProfessorDto) {
        let professor: Professor = new InfrastructureProfessor(
            createProfessorDto,
        );
        return await this.professorRegisterUseCase.execute(professor);
    }

    @Get('/prueba')
    @Auth()
    prueba() {
        return { no: 'no autorizado' };
    }
}
