import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { Professor } from 'src/domain/users/professor';
import { ProfessorFollowService } from 'src/domain/users/services/professor/professor-follow.service';

@Injectable()
export class ProfessorFollowUseCase {
    constructor(
        private readonly professorFollowService: ProfessorFollowService,
    ) {}

    async execute(mongoId: string, professor: Professor) {
        try {
            return await this.professorFollowService.execute(
                mongoId,
                professor,
            );
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
