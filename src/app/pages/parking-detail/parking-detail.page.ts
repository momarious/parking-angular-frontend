import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parking } from 'src/app/model/parking';
import { User } from 'src/app/model/user';
import { ParkingService } from 'src/app/services/parking/parking.service';
import { UserService } from 'src/app/services/user/user.service';

import localeFr from "@angular/common/locales/fr";
import { formatDate, registerLocaleData } from "@angular/common";
registerLocaleData(localeFr, "fr");

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.page.html',
  styleUrls: ['./parking-detail.page.scss'],
})
export class ParkingDetailPage implements OnInit {

  id: string;
  parking: Parking = {};
  user: User = { };


  constructor(
    private parkingService: ParkingService,
    private userService: UserService,
    // private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.parkingService.findById(this.id).subscribe((response) => {
      this.parking = response;
      this.userService.findById(this.parking.userid).subscribe((response) => {
        this.user = response as User;
       
      });
    });
  }

}
