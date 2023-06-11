import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';

@Injectable()
export class ProfessorDeleteService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}

    async execute(id: string) {
        return this.professorRepository
            .delete(id)
            .then((id) => {
                return id;
            })
            .catch((error) => {
                throw error;
            });
    }
}
