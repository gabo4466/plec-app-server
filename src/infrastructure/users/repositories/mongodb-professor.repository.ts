import { Professor } from 'src/domain/users/professor';
import { ProfessorRepository } from '../../../domain/users/repositories/professor.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoDbProfessorRepository implements ProfessorRepository {
    create(obj: Professor) {
        throw new Error('Method not implemented.');
    }
    findByTerm(term: string): Professor {
        throw new Error('Method not implemented.');
    }
    getAll(offset: number, limit: number): Professor[] {
        throw new Error('Method not implemented.');
    }
    update(obj: Professor): Professor {
        throw new Error('Method not implemented.');
    }
    delete(id: string) {
        throw new Error('Method not implemented.');
    }
}
