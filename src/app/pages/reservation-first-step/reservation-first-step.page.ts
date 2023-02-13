import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { Parking } from 'src/app/model/parking';
import { Reservation } from 'src/app/model/reservation';
import { Spot } from 'src/app/model/spot';
import { NavParamService } from 'src/app/services/nav/nav-param.service';
import { ParkingService } from 'src/app/services/parking/parking.service';
import { SpotService } from 'src/app/services/spot/spot.service';

import localeFr from "@angular/common/locales/fr";
import { formatDate, registerLocaleData } from "@angular/common";
registerLocaleData(localeFr, "fr");

@Component({
  selector: 'app-reservation-first-step',
  templateUrl: './reservation-first-step.page.html',
  styleUrls: ['./reservation-first-step.page.scss'],
})
export class ReservationFirstStepPage implements OnInit {

  spot: Spot = {};
  reservation: Reservation = {};
  parking: Parking = {};
  id;
  time;

  constructor(
    private spotService: SpotService,
    private parkingService: ParkingService,
    private navParamService: NavParamService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.parkingService.findById(this.id).subscribe((response) => {
      this.parking = response;
      // console.log(this.parking);
    });
  }

  display;
  eventSource = [];
  viewTitle: string;
  calendar = {
    
    // mode: 'month',
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
    // console.log(ev);
  }

  onCurrentDateChanged(event: Date) {
    this.display = this.getDateFr(event);
    // this.spotService
    //   .findByParkingAndDate(this.id, this.display)
    //   .subscribe((response) => {
    //     if (response == null) {
    //       this.spot = {};
    //     } else {
    //       this.spot = response;
    //     }
    //   });
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

  nextPage(spotid, placesUsed) {
    this.reservation.spotid = spotid;
    this.reservation.spotsinuse = placesUsed;
    this.reservation.startDate = new Date(this.display);
    this.reservation.startTime = this.time;
    this.navParamService.set(this.reservation);
    this.router.navigate(['/parkings/' + this.id + '/reservation-second-step']);
  }

  onClick(time: Date) {
    if (this.time == null || this.display == null) {
      this.presentToast("Veullez choisir l'heure");
      return ;
    }

    this.spotService
      .findAvailableByParkingAndDateAndTime(
        this.parking.id,
        this.display,
        new Date(time).toLocaleTimeString()
      )
      .subscribe(
        (response) => {
          // console.log('response', response);
          if (response == null) {
            // console.log('null'+ 'oui');
            this.nextPage(0, 0);
          } else {
            if (response.spotsinuse <= this.parking.capacity) {
              this.nextPage(response.id, response.spotsinuse);
              // console.log('pas rempli' + 'oui');
            } else {
              // console.log('rempli' +'non');
              this.presentToast("Pas de places disponibles à l'heure que vous avez choisie")
            }
          }
        },
        (error) => {
          // console.log('error', error);
        }
      );
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    return toast.present();
  }

}
