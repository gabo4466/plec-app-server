import {
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Professor } from 'src/domain/users/professor';

export class CreateProfessorDto {
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

    converToProfessor() {
        let professor = new Professor();
        professor.email = this.email;
        professor.bio = this.bio;
        professor.linkedin = this.linkedin;
        professor.password = this.password;
        return professor;
    }
}
