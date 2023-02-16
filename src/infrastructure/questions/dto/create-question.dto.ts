import { QuestionInt } from 'src/domain/questions/interfaces/question.interface';
import { AnswerInt } from 'src/domain/questions/interfaces/answer.interface';
import { IsArray, IsOptional, IsString } from 'class-validator';
export class CreateQuestionDto implements QuestionInt {
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsArray({
        each: true,
    })
    answers: AnswerInt[];
}
