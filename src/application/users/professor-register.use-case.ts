import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Professor } from '../../domain/users/professor';
import { ProfessorCreateService } from '../../domain/users/services/professor/professor-create.service';
import { ProfessorCheckService } from '../../domain/users/services/professor/professor-check.service';
import { UserException } from '../../domain/users/exceptions/user.exception';
import { CryptService } from '../../domain/common/services/crypt.service';

@Injectable()
export class ProfessorRegisterUseCase {
    constructor(
        private readonly professorCreateService: ProfessorCreateService,
        private readonly professorCheckService: ProfessorCheckService,
        @Inject('CryptService')
        private readonly cryptService: CryptService,
    ) {}

    async execute(professor: Professor) {
        professor.password = this.cryptService.encrypt(professor.password);
        try {
            if (await this.professorCheckService.execute(professor)) {
                throw new UserException(1);
            }
            let newProfessor = await this.professorCreateService.execute(
                professor,
            );
            return newProfessor.toObject();
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
