import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
export class StartGameDto {
    @IsArray({
        each: true,
    })
    questions: string[];
}
