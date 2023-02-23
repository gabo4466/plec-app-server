import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';

@Injectable()
export class ProfessorRoleUpdateService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}
    async execute(id: string, role: string) {
        return this.professorRepository
            .roleUpdate(id, role)
            .then((id) => {
                return id;
            })
            .catch((error) => {
                throw error;
            });
    }
}
