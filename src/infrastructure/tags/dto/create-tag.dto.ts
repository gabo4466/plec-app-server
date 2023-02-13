import { IsOptional, IsString, MinLength } from 'class-validator';

export class createTagDto {
    @IsString()
    @MinLength(2)
    name: string;
    @IsString()
    @IsOptional()
    color: string;
}
