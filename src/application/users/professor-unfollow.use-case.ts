import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { Professor } from 'src/domain/users/professor';
import { ProfessorUnfollowService } from 'src/domain/users/services/professor/professor-unfollow.service';

@Injectable()
export class ProfessorUnfollowUseCase {
    constructor(
        private readonly professorUnfollowService: ProfessorUnfollowService,
    ) {}

    async execute(mongoId: string, professor: Professor) {
        try {
            return await this.professorUnfollowService.execute(
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
