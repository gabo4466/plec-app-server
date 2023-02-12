import { CRUDRepository } from '../../crud.repository';
import { Professor } from '../professor';
export interface ProfessorRepository<T> extends CRUDRepository<Professor, T> {}
