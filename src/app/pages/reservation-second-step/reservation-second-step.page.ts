import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Parking } from 'src/app/model/parking';
import { Reservation } from 'src/app/model/reservation';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NavParamService } from 'src/app/services/nav/nav-param.service';
import { ParkingService } from 'src/app/services/parking/parking.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SpotService } from 'src/app/services/spot/spot.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reservation-second-step',
  templateUrl: './reservation-second-step.page.html',
  styleUrls: ['./reservation-second-step.page.scss'],
})
export class ReservationSecondStepPage implements OnInit {

  reservation: Reservation = {};
  user: User = {};
  parking: Parking = {};
  id;
  hours;
  sum;
  carwashing;
  hoursNull = false;

  constructor(
    private navParamService: NavParamService,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private userService: UserService,
    private toastController: ToastController,
    private auth: AuthenticationService,
    private spotService: SpotService,
    private parkingService: ParkingService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sum = 0;
    this.hours = 0;
    this.reservation = this.navParamService.get();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.parkingService.findById(this.id).subscribe((response) => {
      this.parking = response;
      // console.log(this.reservation);
    });
  }

  submit() {
    this.user = this.storage.getLocalUser();
    
        this.reservation.userid = this.user.id;
        this.reservation.carwashing = this.carwashing;
        this.reservation.price = this.total();
        this.reservation.hours = this.hours;
        this.reservation.parkingid = this.parking.id;
        this.reservation.startTime = new Date(
          this.reservation.startTime.toString()
        ).toLocaleTimeString();

        // if (this.reservation.spotsinuse = 0) {
        //   this.spotService
        //   .create({
        //     parkingid: this.parking.id,
        //     date: this.reservation.startDate,
        //     time: this.reservation.startTime,
        //     spotsinuse: this.reservation.spotsinuse + 1,
        //   })
        //   .subscribe(() => {});
        // }else {

        // }

        if (this.hours == 0) {
         this.hoursNull = true;

          return ;
        }

        this.saveReservation();
        this.saveOrUpdateSpot();

      
        // this.reservationService
        //   .insert(this.reservation)
        //   .subscribe(() => {
        //     this.router.navigate(['/home/history']);
        //   });
    
  }

  increaseQuantity(hours) {
    hours++;
    this.hours = hours;
  }

  decreaseQuantity(hours) {
    hours--;
    this.hours = hours;
  }

  total() {
    this.sum = this.hours * this.parking.price;
    if (this.carwashing == true) {
      return this.sum + 1000;
    }
    return this.sum;
  }

  changeCheckState(ev: any) {
    this.carwashing = ev;
    this.total();
  }

  saveReservation() {
    this.reservationService.insert(this.reservation).subscribe(() => {
      this.router.navigateByUrl('/tabs/tab2');
    });
  }

  saveOrUpdateSpot() {
    if (this.reservation.spotsinuse == 0) {
      this.spotService
        .create({
          parkingid: this.parking.id,
          date: this.reservation.startDate,
          time: this.reservation.startTime,
          spotsinuse: 1,
        })
        .subscribe(() => {});
    } else {
      this.spotService
        .edit({
          id: this.reservation.spotid,
          // parkingid: this.parking.id,
          // date: this.reservation.startDate,
          // time: this.reservation.startTime,
          spotsinuse: this.reservation.spotsinuse + 1,
        })
        .subscribe(() => {});
    }
  }

}
