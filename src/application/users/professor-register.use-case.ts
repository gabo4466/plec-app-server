import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Professor } from '../../domain/users/professor';
import { ProfessorCreateService } from '../../domain/users/services/professor/professor-create.service';
import { ProfessorCheckService } from '../../domain/users/services/professor/professor-check.service';
import { UserException } from '../../domain/users/exceptions/user.exception';

@Injectable()
export class ProfessorRegisterUseCase {
    constructor(
        private readonly professorCreateService: ProfessorCreateService,
        private readonly professorCheckService: ProfessorCheckService,
    ) {}

    async execute(professor: Professor) {
        try {
            if (await this.professorCheckService.execute(professor)) {
                // TODO: SHOULD SEND MESSAGE WITH DETAILS ABOUT ERROR
                throw new UserException(45);
            }

            return professor;
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