export interface Reservation {

    // spot?: Spot;
id?: any;
    startDate?: any;    
    startTime?: String;

    // endTime?: String;
    // endDate?: String;
    hours?: String;
    carwashing?: {
        checked?: boolean;
    };

    price? : number;
    userid?: any;
    parkingid?: any;



    parkingname?: any;
    spotsinuse?: any;
    spotid?:any;

}
