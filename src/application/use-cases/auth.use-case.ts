import { Injectable } from '@nestjs/common';
import { ProfessorService } from '../../domain/model/services/professor.service';

@Injectable()
export class AuthUseCase {
    constructor(private readonly professorService: ProfessorService) {}

    login() {
        // LOGICA PARA LOGUEAR UTILIZANDO EL SERVICIO DE P[RPOFEKOSOIJAM]
    }

    register() {
        // LOGICA PARA registrarsexed UTILIZANDO EL SERVICIO DE P[RPOFEKOSOIJAM]
    }
}
