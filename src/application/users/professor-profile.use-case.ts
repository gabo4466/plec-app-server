import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { ProfessorProfileService } from 'src/domain/users/services/professor/professor-profile.service';

@Injectable()
export class ProfessorProfileUseCase {
    constructor(
        private readonly professorProfileService: ProfessorProfileService,
    ) {}
    async execute(id: string) {
        const professor = await this.professorProfileService.execute(id);
        try {
            if (!professor) {
                throw new UserException(2);
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
