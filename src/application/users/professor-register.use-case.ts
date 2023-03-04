import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Professor } from 'src/domain/users/professor';
import { ProfessorCreateService } from 'src/domain/users/services/professor/professor-create.service';
import { ProfessorCheckService } from 'src/domain/users/services/professor/professor-check.service';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { CryptService } from 'src/domain/common/services/crypt.service';

@Injectable()
export class ProfessorRegisterUseCase {
    constructor(
        private readonly professorCreateService: ProfessorCreateService,
        private readonly professorCheckService: ProfessorCheckService,
        @Inject('CryptService')
        private readonly cryptService: CryptService,
    ) {}

    async execute(professor: Professor) {
        try {
            if (await this.professorCheckService.execute(professor.email)) {
                throw new UserException(1);
            }

            professor.password = this.cryptService.encrypt(professor.password);

            const newProfessor = await this.professorCreateService.execute(
                professor,
            );
            delete newProfessor.password;
            return newProfessor;
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
