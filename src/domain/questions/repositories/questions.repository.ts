import { CRUDRepository } from 'src/domain/crud.repository';
import Question from 'src/domain/questions/question';

export interface QuestionsRepository extends CRUDRepository<Question<any>> {}
