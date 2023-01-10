import { User } from "./User";

export class Dean {
    user: User;

    constructor(user: User) {
        this.user = user;
        this.user.is_dean = true;
    }
}