import { IsEmail, IsString } from 'class-validator';

export class CreatePlayerDto {
    @IsString()
    @IsEmail()
    email: string;
}
