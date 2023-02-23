import { CRUDRepository } from '../../crud.repository';
import { Professor } from '../professor';
export interface ProfessorRepository extends CRUDRepository<Professor> {
    activate(id: string): Promise<any>;
    verify(id: string): Promise<any>;
    roleUpdate(id: string, role: string): Promise<any>;
    modSearch(
        term: string,
        offset: number,
        limit: number,
        isActive: boolean,
        isBanned: boolean,
        isVerified: boolean,
    ): Promise<Professor[]>;
}
