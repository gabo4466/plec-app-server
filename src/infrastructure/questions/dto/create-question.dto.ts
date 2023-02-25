import { QuestionInt } from 'src/domain/questions/interfaces/question.interface';
import { AnswerInt } from 'src/domain/questions/interfaces/answer.interface';
import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
export class CreateQuestionDto implements QuestionInt {
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    difficulty: number;

    @IsArray({
        each: true,
    })
    answers: AnswerInt[];

    @IsArray()
    tagsIds: string[];
}
