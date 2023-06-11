import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Professor } from 'src/domain/users/professor';
import { ProfessorCheckService } from 'src/domain/users/services/professor/professor-check.service';
import { CryptService } from 'src/domain/common/services/crypt.service';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/domain/users/interfaces/jwt-payload.interface';

@Injectable()
export class ProfessorLoginUseCase {
    constructor(
        private readonly professorCheckService: ProfessorCheckService,
        @Inject('CryptService')
        private readonly cryptService: CryptService,
        private readonly jwtService: JwtService,
    ) {}

    private generateToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    async execute(professor: Professor) {
        const checkedProfessor = await this.professorCheckService.execute(
            professor.email,
        );
        try {
            if (!checkedProfessor) {
                throw new UserException(2);
            }
            if (
                !this.cryptService.compare(
                    professor.password,
                    checkedProfessor.password,
                )
            ) {
                throw new UserException(2);
            }
            delete checkedProfessor.password;
            return {
                token: this.generateToken({ id_user: checkedProfessor.id }),
                ...checkedProfessor,
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
