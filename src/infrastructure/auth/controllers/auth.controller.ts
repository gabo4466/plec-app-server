import { Controller, Post } from '@nestjs/common';
import { ProfessorService } from '../../../domain/model/services/professor.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly professorService: ProfessorService) {}
}
