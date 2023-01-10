import { EventEmitter } from "@angular/core";
import { Appointment } from "../models/Appointment";

export class Emitter {
    static isAuthenticated = new EventEmitter<boolean>();
    static userId = new EventEmitter<number>();
    static usertype = new EventEmitter<string>();
    static patientAppointments = new EventEmitter<Appointment[]>;
}