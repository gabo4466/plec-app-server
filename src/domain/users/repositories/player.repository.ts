import { CRUDRepository } from 'src/domain/crud.repository';
import { Player } from '../player';

export interface PlayerRepository extends CRUDRepository<Player> {}
