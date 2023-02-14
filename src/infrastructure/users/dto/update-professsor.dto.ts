import { IsString, MinLength } from 'class-validator';
import { ProfessorInt } from 'src/domain/users/interfaces/professor.interface';

export class UpdateProfessorDto implements ProfessorInt {
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    linkedin: string;

    @IsString()
    bio: string;
}
