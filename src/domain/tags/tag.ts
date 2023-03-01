import { TagInt } from './interfaces/tag.interface';

export class Tag {
    public _id: string;
    public name: string;
    public color: string;

    setDataFromInt(tag: TagInt) {
        if (tag._id) {
            this._id = tag._id;
        }
        this.name = tag.name;
        this.color = tag.color;
    }
}
