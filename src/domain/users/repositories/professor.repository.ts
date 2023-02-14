import { CRUDRepository } from '../../crud.repository';
import { Professor } from '../professor';
export interface ProfessorRepository extends CRUDRepository<Professor> {
    follow(mongoId: string, professor: Professor): Promise<void>;
    unfollow(mongoId: string, professor: Professor): Promise<void>;
}
