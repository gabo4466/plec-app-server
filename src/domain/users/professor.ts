import { Person } from './person';
export class Professor extends Person {
    private _linkedin: string;
    private _bio: string;
    private _password: string;
    private _roles: string[];

    constructor() {
        super();
    }

    public get linkedin() {
        return this._linkedin;
    }

    public set linkedin(newLinkedin: string) {
        this._linkedin = newLinkedin;
    }

    public get bio() {
        return this._bio;
    }

    public set bio(newBio: string) {
        this._bio = newBio;
    }

    public get password() {
        return this._password;
    }

    public set password(newPassword: string) {
        this._password = newPassword;
    }

    public get roles() {
        return this._roles;
    }

    public set roles(newRoles: string[]) {
        this._roles = newRoles;
    }

    public addRol(newRol: string) {
        this._roles.push(newRol);
    }

    public toObject() {
        return {
            email: this.email,
            name: this.name,
            bio: this.bio,
            linkedin: this.linkedin,
            roles: this._roles,
        };
    }
}
