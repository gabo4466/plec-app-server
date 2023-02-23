import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { ProfessorCheckService } from 'src/domain/users/services/professor/professor-check.service';
import { ProfessorVerifyService } from 'src/domain/users/services/professor/professor-verify.service';

@Injectable()
export class ProfessorVerifyUseCase {
    constructor(
        private readonly professorVerifyService: ProfessorVerifyService,
        private readonly professorCheckService: ProfessorCheckService,
    ) {}
    async execute(id: string) {
        try {
            if (!(await this.professorCheckService.execute(id))) {
                throw new UserException(2);
            }
            return { id: await this.professorVerifyService.execute(id) };
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
