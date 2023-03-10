import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query,
} from '@nestjs/common';
import { ProfessorSearchUseCase } from 'src/application/users/professor-search.use-case';
import { ProfessorUpdateUseCase } from 'src/application/users/professor-update.use-case';
import { PaginationDto } from 'src/infrastructure/dto/pagination.dto';
import { Auth } from '../decorators/auth.decorator';
import { GetUser } from '../decorators/get-user.decorator';
import { UpdateProfessorDto } from '../dto/update-professsor.dto';
import { Professor } from 'src/domain/users/professor';
import { ValidRoles } from 'src/domain/users/interfaces/valid-roles.enum';
import { ProfessorDeleteUseCase } from 'src/application/users/professor-delete.use-case';

@Controller('users')
export class UsersController {
    constructor(
        private readonly professorSearchUseCase: ProfessorSearchUseCase,
        private readonly professorUpdateUseCase: ProfessorUpdateUseCase,
        private readonly professorDeleteUseCase: ProfessorDeleteUseCase,
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

    @Delete(':id')
    @Auth(ValidRoles.mod, ValidRoles.admin)
    async delete(@Param('id') id: string) {
        return await this.professorDeleteUseCase.execute(id);
    }
}
