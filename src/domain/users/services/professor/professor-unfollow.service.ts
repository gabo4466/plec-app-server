import { Inject, Injectable } from '@nestjs/common';
import { Professor } from '../../professor';
import { ProfessorRepository } from '../../repositories/professor.repository';

@Injectable()
export class ProfessorUnfollowService {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {}

    async execute(mongoId: string, professor: Professor) {
        // return this.professorRepository
        //     .unfollow(mongoId, professor)
        //     .then((res) => {
        //         return res;
        //     })
        //     .catch((error) => {
        //         throw error;
        //     });
    }
}
