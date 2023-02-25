import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import Question from 'src/domain/questions/question';
import { QuestionsCreateService } from 'src/domain/questions/services/questions-create.service';
import { Tag } from 'src/domain/tags/tag';
import { TagsFindByTermService } from '../../domain/tags/services/tags-find-by-term.service';

@Injectable()
export class QuestionCreateUseCase {
    constructor(
        private readonly questionCreateService: QuestionsCreateService,
        private readonly tagsFindByTermService: TagsFindByTermService,
    ) {}

    public async execute(question: Question<any>, tagsIds: string[]) {
        try {
            const tags = await Promise.all(
                tagsIds.map(async (tagId) => {
                    return await this.tagsFindByTermService.execute(tagId);
                }),
            );
            question.tags = tags;
            const questionCreated = await this.questionCreateService.execute(
                question,
            );
            return questionCreated;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
