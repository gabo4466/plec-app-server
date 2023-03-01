import { Injectable } from '@nestjs/common';
import { Player } from 'src/domain/users/player';
import { PlayerRepository } from 'src/domain/users/repositories/player.repository';

@Injectable()
export class MongoosePlayerRepository implements PlayerRepository {
    search(term: string, offset: number, limit: number): Promise<Player[]> {
        throw new Error('Method not implemented.');
    }
    update(obj: Player): Promise<Player> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async create(player: Player): Promise<Player> {
        throw new Error('Method not implemented.');
    }
    async findOneByTerm(term: string): Promise<Player> {
        throw new Error('Method not implemented.');
    }
}
