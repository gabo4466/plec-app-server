import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { Professor } from 'src/domain/users/professor';
import { ProfessorSearchService } from 'src/domain/users/services/professor/professor-search.service';

@Injectable()
export class ProfessorSearchUseCase {
    constructor(
        private readonly professorSearchService: ProfessorSearchService,
    ) {}

    async execute(term: string, offset: number, limit: number) {
        try {
            const professors = await this.professorSearchService.execute(
                term,
                offset,
                limit,
            );
            if (!professors) {
                throw new UserException(2);
            }
            let newProfessors: Professor[] = [];
            professors.forEach((professor) => {
                professor.toObject();
                newProfessors.push(professor);
            });
            return newProfessors;
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
