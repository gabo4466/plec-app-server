import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TagInt } from 'src/domain/tags/interfaces/tag.interface';

export class createTagDto implements TagInt {
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MaxLength(6)
    @MinLength(6)
    color: string;
}
