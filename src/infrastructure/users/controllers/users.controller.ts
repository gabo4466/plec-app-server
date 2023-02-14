import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ProfessorSearchUseCase } from 'src/application/users/professor-search.use-case';
import { UpdateProfessorUseCase } from 'src/application/users/professor-update.use-case';
import { PaginationDto } from 'src/infrastructure/dto/pagination.dto';
import { Auth } from '../decorators/auth.decorator';
import { GetUser } from '../decorators/get-user.decorator';
import { UpdateProfessorDto } from '../dto/update-professsor.dto';
import { Professor } from 'src/domain/users/professor';

@Controller('users')
export class UsersController {
    constructor(
        private readonly professorSearchUseCase: ProfessorSearchUseCase,
        private readonly updateProfessorUseCase: UpdateProfessorUseCase,
    ) {}

    @Get()
    async search(@Query() paginationDto: PaginationDto) {
        const { term = '', limit = 10, offset = 0 } = paginationDto;
        return await this.professorSearchUseCase.execute(term, offset, limit);
    }

    @Patch()
    @Auth()
    async update(
        @Body() updateProfessorDto: UpdateProfessorDto,
        @GetUser() professor: Professor,
    ) {
        console.log(professor);
        professor.setDataFromInt(updateProfessorDto);
        console.log(professor);
        return await this.updateProfessorUseCase.execute(professor);
    }
}
