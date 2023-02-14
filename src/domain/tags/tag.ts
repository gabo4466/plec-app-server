import { TagInt } from './interfaces/tag.interface';

export class Tag {
    private _name: string;
    private _color: string;

    setDataFromInt(tag: TagInt) {
        this._name = tag.name;
        this._color = tag.color;
    }

    public get name() {
        return this._name;
    }

    public set name(newName: string) {
        this._name = newName;
    }

    public get color() {
        return this._color;
    }

    public set color(newColor: string) {
        this._color = newColor;
    }
}
