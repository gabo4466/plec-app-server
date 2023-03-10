import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { Professor } from '../../../domain/users/professor';

@Injectable()
export class UserRoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const validRoles: string[] = this.reflector.get(
            META_ROLES,
            context.getHandler(),
        );

        if (!validRoles || validRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const professor = request.user as Professor;
        if (!professor) {
            throw new BadRequestException('User not found');
        }
        for (const role of professor.roles) {
            if (validRoles.includes(role)) {
                return true;
            }
        }

        throw new ForbiddenException(
            `User ${professor.name} does not have the required permissions`,
        );
    }
}
