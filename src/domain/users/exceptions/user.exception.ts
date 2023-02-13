import { BadRequestException, NotFoundException } from '@nestjs/common';
export class UserException extends Error {
    private _code: number;
    constructor(code: number) {
        super();
        this._code = code;
    }

    public manageException() {
        if (this._code === 1) {
            // TODO: SHOULD SEND MESSAGE WITH DETAILS ABOUT ERROR
            throw new BadRequestException('User already exists');
        } else if (this._code === 2) {
            // TODO: SHOULD SEND MESSAGE WITH DETAILS ABOUT ERROR
            throw new NotFoundException('User not found');
        }
    }
}
