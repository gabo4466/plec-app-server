import { CRUDRepository } from '../../crud.repository';
import { Professor } from '../professor';
export interface ProfessorRepository extends CRUDRepository<Professor> {
    activate(id: string): Promise<any>;
    verify(id: string): Promise<any>;
}
