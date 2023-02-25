import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ProfessorSearchUseCase } from 'src/application/users/professor-search.use-case';
import { ProfessorUpdateUseCase } from 'src/application/users/professor-update.use-case';
import { PaginationDto } from 'src/infrastructure/dto/pagination.dto';
import { Auth } from '../decorators/auth.decorator';
import { GetUser } from '../decorators/get-user.decorator';
import { UpdateProfessorDto } from '../dto/update-professsor.dto';
import { Professor } from 'src/domain/users/professor';
import { ProfessorProfileUseCase } from 'src/application/users/professor-profile.use-case';

@Controller('users/professors')
export class UsersController {
    constructor(
        private readonly professorSearchUseCase: ProfessorSearchUseCase,
        private readonly professorUpdateUseCase: ProfessorUpdateUseCase,
        private readonly professorProfileUseCase: ProfessorProfileUseCase,
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
        professor.setDataFromInt(updateProfessorDto);
        return await this.professorUpdateUseCase.execute(professor);
    }

    @Get(':id')
    async profile(@Param('id') id: string) {
        return await this.professorProfileUseCase.execute(id);
    }
}
