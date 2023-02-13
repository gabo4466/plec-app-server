import { Professor } from '../../../domain/users/professor';
import { ProfessorInt } from '../interfaces/professor.interface';
export class InfrastructureProfessor extends Professor {
    constructor(professor: ProfessorInt) {
        super();

        this.email = professor.email;
        if (professor._id) {
            this.id = professor._id;
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
}
