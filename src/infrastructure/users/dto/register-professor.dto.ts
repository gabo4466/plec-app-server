import {
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ProfessorInt } from '../interfaces/professor.interface';

export class RegisterProfessorDto implements ProfessorInt {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @IsOptional()
    linkedin: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @MinLength(6)
    @MaxLength(100)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;
}
