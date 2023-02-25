import { CRUDRepository } from 'src/domain/crud.repository';
import Question from 'src/domain/questions/question';

export interface QuestionRepository extends CRUDRepository<Question<any>> {}
