export class Appointment {
    id: number;
    patient: number;
    department: string;
    date: string;
    message: string;
  
    constructor(id: number, patient: number, department: string, date: string, message: string) {
        this.id = id;
        this.patient = patient;
        this.department = department;
        this.date = date;
        this.message = message;
    }
}