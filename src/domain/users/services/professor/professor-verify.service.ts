import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../../repositories/professor.repository';

@Injectable()
export class ProfessorVerifyService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}

    async execute(id: string) {
        return this.professorRepository
            .verify(id)
            .then((id) => {
                return id;
            })
            .catch((error) => {
                throw error;
            });
    }
}
