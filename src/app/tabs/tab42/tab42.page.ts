import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { Spot } from 'src/app/model/spot';
import { Reservation } from 'src/app/model/reservation';
import { Parking } from 'src/app/model/parking';
import { User } from 'src/app/model/user';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { UserService } from 'src/app/services/user/user.service';
import { ParkingService } from 'src/app/services/parking/parking.service';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { StorageService } from 'src/app/services/storage/storage.service';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-tab42',
  templateUrl: './tab42.page.html',
  styleUrls: ['./tab42.page.scss'],
})
export class Tab42Page implements OnInit {
  spot: Spot = {};
  parking: Parking = {};
  reservation: Reservation = {};
  reservations: any[] = [];
  user: User = {};

  constructor(
    private reservationService: ReservationService,
    private userService: UserService,
    private parkingService: ParkingService,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    this.user = this.storage.getLocalUser();
    this.parkingService.findByUserId(this.user.id).subscribe((response) => {
      this.parking = response;
    });
  }

  display;
  eventSource = [];
  viewTitle: string;
  calendar = {
    currentDate: new Date(),
  };
  selectedDate: Date;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    console.log(ev);
  }

  onCurrentDateChanged(event: Date) {
    this.display = this.getDateFr(event);
    this.reservationService
      .findByParkingAndDate(this.parking.id, this.display)
      .subscribe((response) => {
        this.reservations = [];
        response.forEach((element) => {
          this.userService.findById(element.userid).subscribe((user) => {
            this.reservations.push({
              userid: user.id,
              usermatricule: user.vehicle.registration,
              username: user.firstname + ' ' + user.lastname,
              reservationtime: element.startTime,
              reservationhours: element.hours,
              reservationprice: element.price,
            });
          });
        });
      });
  }

  getDateFr(event: Date) {
    var returnDate = '';
    var dd = event.getDate();
    var mm = event.getMonth() + 1; //because January is 0!
    var yyyy = event.getFullYear();
    returnDate += `${yyyy}-`;
    if (mm < 10) {
      returnDate += `0${mm}-`;
    } else {
      returnDate += `${mm}-`;
    }

    if (dd < 10) {
      returnDate += `0${dd}`;
    } else {
      returnDate += `${dd}`;
    }
    return returnDate;
  }
}
