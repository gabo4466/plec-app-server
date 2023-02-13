import {
    createParamDecorator,
    ExecutionContext,
    InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const professor = req.professor;
        if (!professor) {
            throw new InternalServerErrorException('Something went wrong');
        }
        return !data ? professor : professor[data];
    },
);
