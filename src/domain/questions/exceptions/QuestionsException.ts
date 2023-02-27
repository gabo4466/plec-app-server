import { BadRequestException } from '@nestjs/common';

export class QuestionsException extends Error {
    private _code: number;
    constructor(code: number) {
        super();
        this._code = code;
    }

    public manageException() {
        if (this._code === 2) {
            throw new BadRequestException('Question not found');
        }
    }
}
