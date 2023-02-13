import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/reservation';
import { User } from 'src/app/model/user';
import { ParkingService } from 'src/app/services/parking/parking.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { StorageService } from 'src/app/services/storage/storage.service';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  reservations: Reservation[] = [];
  user: User = {};

  constructor(
    private storage: StorageService,
    private parkingService: ParkingService,
    private reservationService: ReservationService
    ) {}

  ngOnInit() {
    this.user = this.storage.getLocalUser(); 
      this.reservationService.findByUserid(this.user.id).subscribe((arrayreservation) => {
        arrayreservation.forEach((reservationdata) => {
          this.parkingService.findById(reservationdata.parkingid).subscribe((parkingdata) => {
            this.reservations.push({
              parkingname: parkingdata.name,
              id: reservationdata.id,
              startDate: reservationdata.startDate,
              startTime: reservationdata.startTime,
              hours: reservationdata.hours,
              price: reservationdata.price,
              carwashing: reservationdata.carwashing

            });
          });
        });
      });
  }

  refresh() {
    this.ngOnInit();
  }
}
