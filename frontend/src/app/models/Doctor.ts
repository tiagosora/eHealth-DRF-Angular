import { User } from "./User";

export class Doctor {
    user: User;

    constructor(user: User) {
        this.user = user;
        this.user.is_doctor = true;
    }
}