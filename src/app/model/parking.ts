import { Planning } from "./planning";
import { Spot } from "./spot";

export interface Parking {
    id?: String;
    // address?: {};
    planning?: Planning;
    name?: String;
    image?: String;
    // phone?: String;
    // open?:  any;
    spots?: Spot[];

    manager?: String;
    userid?: String;


    securitycamera?: boolean;
    securityagent?: boolean;
    carwash?: boolean;
    protectiveroof?: boolean;

    longitude?: any;
    latitude?: any;
    
    capacity?: number;

    price?: number;

    description?: any;
    


}
