import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { ProfessorCheckService } from '../../domain/users/services/professor/professor-check.service';
import { TagsFindByTermService } from '../../domain/tags/services/tags-find-by-term.service';
import { TagException } from 'src/domain/tags/exceptions/tag.exception';
import { QuestionsSearchByProfessorAndTagService } from 'src/domain/questions/services/questions-search-by-professor-and-tag.service';

@Injectable()
export class QuestionSearchUseCase {
    constructor(
        private readonly professorCheckService: ProfessorCheckService,
        private readonly tagsFindByTermService: TagsFindByTermService,
        private readonly questionsSearchByProfessorAndTagService: QuestionsSearchByProfessorAndTagService,
    ) {}

    async execute(
        professorId: string,
        tagId: string,
        limit: number,
        offset: number,
    ) {
        try {
            const professor = await this.professorCheckService.execute(
                professorId,
            );
            if (!professor) {
                throw new UserException(2);
            }
            const tag = await this.tagsFindByTermService.execute(tagId);
            if (!tag) {
                throw new TagException(2);
            }
            return await this.questionsSearchByProfessorAndTagService.execute(
                professor,
                tag,
                offset,
                limit,
            );
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
