import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { Professor } from 'src/domain/users/professor';
import { ProfessorModSearchService } from 'src/domain/users/services/professor/professor-mod-search.service';

@Injectable()
export class ProfessorModSearchUseCase {
    constructor(
        private readonly professorModSearchService: ProfessorModSearchService,
    ) {}

    async execute(
        term: string,
        offset: number,
        limit: number,
        isActive: boolean,
        isBanned: boolean,
        isVerified: boolean,
    ) {
        try {
            const professors = await this.professorModSearchService.execute(
                term,
                offset,
                limit,
                isActive,
                isBanned,
                isVerified,
            );
            if (!professors) {
                throw new UserException(2);
            }
            return professors;
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
