import {
    Injectable,
    Inject,
    UnauthorizedException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ProfessorRepository } from 'src/domain/users/repositories/professor.repository';
import { Professor } from '../../../domain/users/professor';
import { JwtPayload } from '../../../domain/users/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Professor> {
        let professor: Professor;

        try {
            const { id_user } = payload;
            professor = await this.professorRepository.findOneByTerm(id_user);
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }

        if (!professor.isActive) {
            throw new UnauthorizedException('User is not active');
        }
        if (professor.isBanned) {
            throw new UnauthorizedException('User is banned');
        }
        if (!professor.isVerified) {
            throw new UnauthorizedException('User is not verified');
        }
        return professor;
    }
}
