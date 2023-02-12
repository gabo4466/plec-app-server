import { BadRequestException } from '@nestjs/common';
export class UserException extends Error {
    private _code: number;
    constructor(code: number) {
        super();
        this._code = code;
    }

    public manageException() {
        if (this._code === 45) {
            throw new BadRequestException('User already exists');
        }
    }
}
