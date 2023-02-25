import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { ProfessorActivateService } from 'src/domain/users/services/professor/professor-activate.service';
import { ProfessorCheckService } from 'src/domain/users/services/professor/professor-check.service';

@Injectable()
export class ProfessorActivateUseCase {
    constructor(
        private readonly professorActivateService: ProfessorActivateService,
        private readonly professorCheckService: ProfessorCheckService,
    ) {}
    async execute(id: string) {
        try {
            if (!(await this.professorCheckService.execute(id))) {
                throw new UserException(2);
            }
            return { id: await this.professorActivateService.execute(id) };
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
