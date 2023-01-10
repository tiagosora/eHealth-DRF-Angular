export class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    is_patient: boolean;
    is_doctor: boolean;
    is_dean: boolean;
  
    constructor(id: number, first_name: string, last_name: string, email: string, password: string) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.is_patient = false;
        this.is_doctor = false;
        this.is_dean = false;
    }
}