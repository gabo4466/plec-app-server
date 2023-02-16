import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/infrastructure/users/decorators/auth.decorator';
import { GetUser } from 'src/infrastructure/users/decorators/get-user.decorator';
import { Professor } from 'src/domain/users/professor';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Controller('questions')
export class QuestionsController {
    @Post()
    @Auth()
    async createQuestion(
        @Body() createQuestionDto: CreateQuestionDto,
        @GetUser() user: Professor,
    ) {
        return user;
    }
}
