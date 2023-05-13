import { Inject, Injectable } from '@nestjs/common';
import { UserException } from '../../exceptions/user.exception';
import { PlayerRepository } from '../../repositories/player.repository';

@Injectable()
export class PlayerFindByTermService {
    constructor(
        @Inject('PlayerRepository')
        private readonly playerRepository: PlayerRepository,
    ) {}

    execute(term: string) {
        return this.playerRepository
            .findOneByTerm(term)
            .then((player) => {
                return player;
            })
            .catch((error) => {
                if (error) {
                    throw error;
                } else {
                    return;
                }
            });
    }
}
