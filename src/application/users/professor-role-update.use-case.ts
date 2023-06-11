import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { ProfessorCheckService } from 'src/domain/users/services/professor/professor-check.service';
import { ProfessorRoleUpdateService } from 'src/domain/users/services/professor/professor-role-update.service';

@Injectable()
export class ProfessorRoleUpdateUseCase {
    constructor(
        private readonly professorRoleUpdateService: ProfessorRoleUpdateService,
        private readonly professorCheckService: ProfessorCheckService,
    ) {}
    async execute(id: string, role: string) {
        try {
            if (!(await this.professorCheckService.execute(id))) {
                throw new UserException(2);
            }
            return {
                id: await this.professorRoleUpdateService.execute(id, role),
            };
        } catch (error) {
            if (error instanceof UserException) {
                error.manageException();
            } else {
                console.log(error['message']);
                throw new InternalServerErrorException();
            }
        }
    }
}
