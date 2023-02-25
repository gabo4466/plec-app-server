import { Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { ProfessorActivateUseCase } from 'src/application/users/professor-activate.use-case';
import { ProfessorDeleteUseCase } from 'src/application/users/professor-delete.use-case';
import { ProfessorModSearchUseCase } from 'src/application/users/professor-mod-search.use-case';
import { ProfessorRoleUpdateUseCase } from 'src/application/users/professor-role-update.use-case';
import { ProfessorVerifyUseCase } from 'src/application/users/professor-verify.use-case';
import { ValidRoles } from 'src/domain/users/interfaces/valid-roles.enum';
import { PaginationDto } from 'src/infrastructure/dto/pagination.dto';
import { Auth } from '../decorators/auth.decorator';

@Controller('mod/users/professors')
export class ModUsersController {
    constructor(
        private readonly professorDeleteUseCase: ProfessorDeleteUseCase,
        private readonly professorRoleUpdateUseCase: ProfessorRoleUpdateUseCase,
        private readonly professorActivateUseCase: ProfessorActivateUseCase,
        private readonly professorVerifyUseCase: ProfessorVerifyUseCase,
        private readonly professorModSearchUseCase: ProfessorModSearchUseCase,
    ) {}

    @Delete(':id')
    @Auth(ValidRoles.mod, ValidRoles.admin)
    async delete(@Param('id') id: string) {
        return await this.professorDeleteUseCase.execute(id);
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

    @Get('not-verified')
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
