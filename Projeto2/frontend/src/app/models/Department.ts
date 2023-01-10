import { Doctor } from "./Doctor";

export class Department {
    name: string;
    doctors: Doctor[];
  
    constructor(name: string, doctors: Doctor[]) {
        this.name = name;
        this.doctors = doctors;
    }
}