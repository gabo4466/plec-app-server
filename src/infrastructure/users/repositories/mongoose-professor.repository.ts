import { Injectable } from '@nestjs/common';
import { Professor } from 'src/domain/users/professor';
import { ProfessorRepository } from '../../../domain/users/repositories/professor.repository';
import { MongooseProfessorDto } from '../data-base-dtos/mongoose/mongoose-professor.dto';

@Injectable()
export class MongooseProfessorRepository implements ProfessorRepository {
    create(obj: Professor): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findByTerm(term: string): Promise<Professor> {
        throw new Error('Method not implemented.');
    }
    getAll(offset: number, limit: number): Promise<Professor[]> {
        throw new Error('Method not implemented.');
    }
    update(obj: Professor): Promise<Professor> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
