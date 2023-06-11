import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Auth } from 'src/infrastructure/users/decorators/auth.decorator';
import { GetUser } from 'src/infrastructure/users/decorators/get-user.decorator';
import { Professor } from 'src/domain/users/professor';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { SimpleSelectionQuestion } from 'src/domain/questions/simple-selection-question';
import { QuestionCreateUseCase } from 'src/application/questions/question-create.use-case';
import Question from 'src/domain/questions/question';
import { MultipleSelectionQuestion } from 'src/domain/questions/multiple-selection-question';
import { TrueFalseQuestion } from 'src/domain/questions/true-false-question';
import { OrderQuestion } from 'src/domain/questions/order-question';
import { WrittenQuestion } from 'src/domain/questions/written-question';
import { OfftopicQuestion } from 'src/domain/questions/offtopic-question';
import { QuestionFindByIdUseCase } from '../../../application/questions/question-find-by-id.use-case';
import { PaginationDto } from 'src/infrastructure/dto/pagination.dto';
import { QuestionSearchUseCase } from '../../../application/questions/question-search.use-case';

@Controller('questions')
export class QuestionsController {
    constructor(
        private readonly questionCreateUseCase: QuestionCreateUseCase,
        private readonly questionFindByIdUseCase: QuestionFindByIdUseCase,
        private readonly questionSearchUseCase: QuestionSearchUseCase,
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

    @Post('multiple-selection')
    @Auth()
    async createMultipleSelectionQuestion(
        @Body() createQuestionDto: CreateQuestionDto,
        @GetUser() user: Professor,
    ) {
        const question = new MultipleSelectionQuestion();
        return this.createQuestion(createQuestionDto, question, user);
    }

    @Post('true-false')
    @Auth()
    async createTrueFalseQuestion(
        @Body() createQuestionDto: CreateQuestionDto,
        @GetUser() user: Professor,
    ) {
        const question = new TrueFalseQuestion();
        return this.createQuestion(createQuestionDto, question, user);
    }

    @Post('order')
    @Auth()
    async createOrderQuestion(
        @Body() createQuestionDto: CreateQuestionDto,
        @GetUser() user: Professor,
    ) {
        const question = new OrderQuestion();
        return this.createQuestion(createQuestionDto, question, user);
    }

    @Post('written')
    @Auth()
    async createWrittenQuestion(
        @Body() createQuestionDto: CreateQuestionDto,
        @GetUser() user: Professor,
    ) {
        const question = new WrittenQuestion();
        return this.createQuestion(createQuestionDto, question, user);
    }

    @Post('offtopic')
    @Auth()
    async createOfftopicQuestion(
        @Body() createQuestionDto: CreateQuestionDto,
        @GetUser() user: Professor,
    ) {
        const question = new OfftopicQuestion();
        return this.createQuestion(createQuestionDto, question, user);
    }

    @Get(':questionId')
    async getQuestion(@Param('questionId') questionId: string) {
        return await this.questionFindByIdUseCase.execute(questionId);
    }

    @Get('search/:professorId/:tagId')
    async searchQuestions(
        @Query() paginationDto: PaginationDto,
        @Param('professorId') professorId: string,
        @Param('tagId') tagId: string,
    ) {
        const { term = '', limit = 10, offset = 0 } = paginationDto;
        return await this.questionSearchUseCase.execute(
            professorId,
            tagId,
            limit,
            offset,
        );
    }

    private async createQuestion(
        createQuestionDto: CreateQuestionDto,
        question: Question<any>,
        professor: Professor,
    ) {
        const { tagsIds } = createQuestionDto;
        const tagsIdsa = tagsIds.map((tagId) => tagId.toString());
        console.log(tagsIdsa);

        question.setDataFromInt(createQuestionDto);
        question.professor = professor;
        return await this.questionCreateUseCase.execute(question, tagsIdsa);
    }
}
