import { ConvertToProfessorDto } from './convert-to-professor.dto';
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Professor } from 'src/domain/users/professor';

export class LoginProfessorDto implements ConvertToProfessorDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(100)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;

    converToProfessor(): Professor {
        const professor = new Professor();
        professor.email = this.email;
        professor.password = this.password;
        return professor;
    }
}
