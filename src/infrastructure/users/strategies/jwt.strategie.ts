import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ProfessorRepository } from 'src/domain/users/repositories/professor.repository';
import { Professor } from '../../../domain/users/professor';

@Injectable()
export class JwtStrategie extends PassportStrategy(Strategy) {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    // async validate(payload: JwtPayload): Promise<Professor> {
    //     const { id_user } = payload;
    //     const professor = await this.professorRepository.findOneByTerm(id_user);

    // }
}
