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
import { ProfessorProfileUseCase } from 'src/application/users/professor-profile.use-case';
import { ProfessorRoleUpdateUseCase } from 'src/application/users/professor-role-update.use-case';
import { ProfessorActivateUseCase } from 'src/application/users/professor-activate.use-case';
import { ProfessorVerifyUseCase } from 'src/application/users/professor-verify.use-case';
import { ProfessorModSearchUseCase } from 'src/application/users/professor-mod-search.use-case';

@Controller('users')
export class UsersController {
    constructor(
        private readonly professorSearchUseCase: ProfessorSearchUseCase,
        private readonly professorUpdateUseCase: ProfessorUpdateUseCase,
        private readonly professorDeleteUseCase: ProfessorDeleteUseCase,
        private readonly professorProfileUseCase: ProfessorProfileUseCase,
        private readonly professorRoleUpdateUseCase: ProfessorRoleUpdateUseCase,
        private readonly professorActivateUseCase: ProfessorActivateUseCase,
        private readonly professorVerifyUseCase: ProfessorVerifyUseCase,
        private readonly professorModSearchUseCase: ProfessorModSearchUseCase,
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

    @Get(':id')
    async profile(@Param('id') id: string) {
        return await this.professorProfileUseCase.execute(id);
    }

    @Patch('activate/:id')
    @Auth(ValidRoles.mod, ValidRoles.admin)
    async activate(@Param('id') id: string) {
        return await this.professorActivateUseCase.execute(id);
    }

    @Patch('verify/:id')
    @Auth(ValidRoles.mod, ValidRoles.admin)
    async verify(@Param('id') id: string) {
        return await this.professorVerifyUseCase.execute(id);
    }

    @Patch('role/:id/:role')
    @Auth(ValidRoles.admin)
    async role(@Param('id') id: string, @Param('role') role: string) {
        return await this.professorRoleUpdateUseCase.execute(id, role);
    }

    @Get('notVerified/')
    @Auth(ValidRoles.mod, ValidRoles.admin)
    async listNotVerified(@Query() paginationDto: PaginationDto) {
        const { term = '', limit = 10, offset = 0 } = paginationDto;
        return await this.professorModSearchUseCase.execute(
            term,
            offset,
            limit,
            true,
            false,
            false,
        );
    }
}
