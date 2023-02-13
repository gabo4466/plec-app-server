import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Professor } from 'src/domain/users/professor';
import { ProfessorCheckService } from '../../domain/users/services/professor/professor-check.service';
import { CryptService } from '../../domain/common/services/crypt.service';
import { UserException } from 'src/domain/users/exceptions/user.exception';

@Injectable()
export class ProfessorLoginUseCase {
    constructor(
        private readonly professorCheckService: ProfessorCheckService,
        @Inject('CryptService')
        private readonly cryptService: CryptService,
    ) {}

    async execute(professor: Professor) {
        try {
            if (!(await this.professorCheckService.execute(professor))) {
                throw new UserException(2);
            }

            const password = this.cryptService.encrypt(professor.password);

            if (password !== professor.password) {
                throw new UserException(2);
            }

            //TODO:devolver JWT
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
