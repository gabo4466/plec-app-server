import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProfessorUpdateService } from 'src/domain/users/services/professor/professor-update.service';
import { Professor } from 'src/domain/users/professor';
import { UserException } from 'src/domain/users/exceptions/user.exception';

@Injectable()
export class UpdateProfessorUseCase {
    constructor(
        private readonly professorUpdateService: ProfessorUpdateService,
    ) {}

    async execute(professor: Professor) {
        try {
            return await this.professorUpdateService.execute(professor);
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
