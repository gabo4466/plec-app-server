export abstract class Person {
    private _email: string;
    private _name: string;
    private _id: string;

    public get id() {
        return this._id;
    }

    public set id(newId: string) {
        this._id = newId;
    }

    public get email() {
        return this._email;
    }

    public set email(newEmail: string) {
        this._email = newEmail;
    }

    public get name() {
        return this._name;
    }

    public set name(newName: string) {
        this._name = newName;
    }
}
