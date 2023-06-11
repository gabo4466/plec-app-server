import { CRUDRepository } from 'src/domain/crud.repository';
import Question from 'src/domain/questions/question';
import { Tag } from 'src/domain/tags/tag';
import { Professor } from 'src/domain/users/professor';

export interface QuestionsRepository extends CRUDRepository<Question<any>> {
    searchByProfessorAndTag(
        professor: Professor,
        tag: Tag,
        limit: number,
        offset: number,
    ): Promise<Question<any>[]>;
    findByProfessor(professor: Professor);
}
