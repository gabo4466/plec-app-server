import { ProfessorInt } from './interfaces/professor.interface';
import { Person } from './person';
export class Professor extends Person {
    private _linkedin: string;
    private _bio: string;
    private _password: string;
    private _roles: string[];
    private _isActive: boolean;
    private _isBanned: boolean;

    constructor() {
        super();
    }

    setDataFromInt(professor: ProfessorInt) {
        if (professor.email) {
            this.email = professor.email;
        }
        if (professor._id) {
            this.id = professor._id;
        }
        if (professor.name) {
            this.name = professor.name;
        }
        if (professor.bio) {
            this.bio = professor.bio;
        }
        if (professor.linkedin) {
            this.linkedin = professor.linkedin;
        }
        if (professor.password) {
            this.password = professor.password;
        }
        if (professor.roles) {
            this.roles = professor.roles;
        }
        if (professor.isBanned !== undefined) {
            this.isBanned = professor.isBanned;
        }
        if (professor.isActive !== undefined) {
            this.isActive = professor.isActive;
        }
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

    public get isActive() {
        return this._isActive;
    }

    public set isActive(newActive: boolean) {
        this._isActive = newActive;
    }

    public get isBanned() {
        return this._isBanned;
    }

    public set isBanned(newBanned: boolean) {
        this._isBanned = newBanned;
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
