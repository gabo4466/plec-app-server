import { ProfessorInt } from './interfaces/professor.interface';
import { Person } from './person';
export class Professor extends Person {
    public linkedin: string;
    public bio: string;
    public password: string;
    public roles: string[];
    public isActive: boolean;
    public isBanned: boolean;
    public isVerified: boolean;

    constructor() {
        super();
    }

    setDataFromInt(professor: ProfessorInt) {
        if (professor.email) {
            this.email = professor.email;
        }
        if (professor._id) {
            this._id = professor._id;
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
        if (professor.isVerified !== undefined) {
            this.isVerified = professor.isVerified;
        }
    }

    public addRol(newRol: string) {
        this.roles.push(newRol);
    }

    public toObject() {
        return {
            email: this.email,
            name: this.name,
            bio: this.bio,
            linkedin: this.linkedin,
            roles: this.roles,
        };
    }
}
