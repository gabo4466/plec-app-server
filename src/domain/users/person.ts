export abstract class Person {
    public email: string;
    public name: string;
    public _id: string;

    public get id(): string {
        return this._id;
    }
}
