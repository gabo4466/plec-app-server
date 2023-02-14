import { Tag } from '../tag';
import { Professor } from '../../users/professor';
export interface TagRepository {
    create(tag: Tag, professor: Professor): Promise<Tag>;
    findOneByTerm(term: string): Promise<Tag>;
    search(term: string, offset: number, limit: number): Promise<Tag[]>;
    delete(id: string): Promise<any>;
}
