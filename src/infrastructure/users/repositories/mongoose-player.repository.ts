import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Player } from 'src/domain/users/player';
import { PlayerRepository } from 'src/domain/users/repositories/player.repository';
import { MongoosePlayerDto } from '../data-base-dtos/mongoose/mongoose-player.dto';

@Injectable()
export class MongoosePlayerRepository implements PlayerRepository {
    constructor(
        @InjectModel(MongoosePlayerDto.name)
        private readonly playerModel: Model<MongoosePlayerDto>,
    ) {}

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
        return new Promise(async (resolve, reject) => {
            try {
                let mongoosePlayer: MongoosePlayerDto;
                mongoosePlayer = await this.playerModel.create(player);
                const newPlayer = mongoosePlayer as Player;
                resolve(newPlayer);
            } catch (error) {
                reject(error);
            }
        });
    }
    async findOneByTerm(term: string): Promise<Player> {
        return new Promise(async (resolve, reject) => {
            try {
                let mongoosePlayer: MongoosePlayerDto;
                // MongoID
                if (isValidObjectId(term)) {
                    mongoosePlayer = await this.playerModel.findById(term);
                }
                // Email
                if (!mongoosePlayer) {
                    mongoosePlayer = await this.playerModel.findOne({
                        email: term.toLowerCase().trim(),
                    });
                }
                // Nickname
                if (!mongoosePlayer) {
                    mongoosePlayer = await this.playerModel.findOne({
                        nickname: term.toLowerCase().trim(),
                    });
                }
                if (!mongoosePlayer) {
                    reject();
                } else {
                    const player = mongoosePlayer as Player;
                    resolve(player);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}
