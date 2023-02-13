import { CRUDRepository } from '../../crud.repository';
import { Tag } from '../tag';
import { Professor } from '../../users/professor';
export interface TagRepository {
    create(tag: Tag, professor: Professor): Promise<Tag>;
    findOneByTerm(term: string): Promise<Tag>;
    getAll(offset: number, limit: number): Promise<Tag[]>;
    search(term: string): Promise<Tag>;
    delete(id: string): Promise<any>;
}
