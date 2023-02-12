import { CRUDRepository } from '../../crud.repository';
import { Professor } from '../professor';
export interface ProfessorRepository extends CRUDRepository<Professor> {}
