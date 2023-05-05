import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfessorCheckService } from 'src/domain/users/services/professor/professor-check.service';
import { QuestionFindByIdUseCase } from '../questions/question-find-by-id.use-case';
import { QuestionsSearchByProfessorAndTagService } from 'src/domain/questions/services/questions-search-by-professor-and-tag.service';
import { QuestionsFindByProfessorService } from 'src/domain/questions/services/questions-find-by-professor.service';
import { Tag } from 'src/domain/tags/tag';

@Injectable()
export class TagsByUserUseCase {
    constructor(
        private readonly professorCheckService: ProfessorCheckService,
        private readonly questionsFindByProfessorService: QuestionsFindByProfessorService, // private readonly questionsSearchByProfessorAndTagService: QuestionsSearchByProfessorAndTagService,
    ) {}

    async execute(id: string) {
        try {
            const professor = await this.professorCheckService.execute(id);
            if (!professor) {
                throw new BadRequestException();
            }
            const questions =
                await this.questionsFindByProfessorService.execute(professor);
            const tags = new Map<string, Tag>();
            questions.forEach((question) => {
                question.tags.forEach((tag: Tag) => {
                    console.log(tag.id);

                    if (!tags.has(tag.id)) {
                        console.log('hello');
                        tags.set(tag.id, tag);
                    }
                });
            });

            return Array.from(tags.values());
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
