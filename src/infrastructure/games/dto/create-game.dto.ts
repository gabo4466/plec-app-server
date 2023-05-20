import { Tag } from '../../../domain/tags/tag';
import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
export class CreateGameDto {
    @IsArray({
        each: true,
    })
    questionsIds: string[];

    @IsArray({
        each: true,
    })
    tag: string[];
}
