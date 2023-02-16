import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/infrastructure/users/decorators/auth.decorator';
import { GetUser } from 'src/infrastructure/users/decorators/get-user.decorator';
import { Professor } from 'src/domain/users/professor';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { SimpleSelectionQuestion } from 'src/domain/questions/simple-selection-question';
import { QuestionCreateUseCase } from 'src/application/questions/question-create.use-case';
import Question from 'src/domain/questions/question';

@Controller('questions')
export class QuestionsController {
    constructor(
        private readonly questionCreateUseCase: QuestionCreateUseCase,
    ) {}

    @Post('simple-selection')
    @Auth()
    async createSimpleSelectionQuestion(
        @Body() createQuestionDto: CreateQuestionDto,
        @GetUser() user: Professor,
    ) {
        const question = new SimpleSelectionQuestion();
        return this.createQuestion(createQuestionDto, question, user);
    }

    private createQuestion(
        createQuestionDto: CreateQuestionDto,
        question: Question<any>,
        professor: Professor,
    ) {
        question.setDataFromInt(createQuestionDto);
        question.setProfessor(professor);
        return this.questionCreateUseCase.execute(question);
    }
}
