import { User } from "./User";

export class Patient {
    user: User;

    constructor(user: User) {
        this.user = user;
        this.user.is_patient = true;
    }
}