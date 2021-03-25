import { Address } from "./address";
import { Parking } from "./parking";
import { Vehicle } from "./vehicle";

export interface User {
    id?: String;
    firstname?: String;
    lastname?: String;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    phone?: String;
    image?: String;
    token?: string;
    role?: string;
    
    address?: Address;    
    vehicle?: Vehicle;
    parking?: Parking;
}
