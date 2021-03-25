import { Component, OnInit } from '@angular/core';
import { Parking } from 'src/app/model/parking';
import { ParkingService } from 'src/app/services/parking/parking.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  
  parkings: Parking[] = [];

  constructor(
    private userService: UserService,
    private parkingService: ParkingService
  ) {}

  ngOnInit() {
    this.parkingService.findAll().subscribe((array) => {
      array.forEach((parking) => {
          this.userService.findById(parking.userid).subscribe((user) => {
            this.parkings.push(
              {
                id: parking.id,
                name : parking.name,
                image: user.image
              }
            );
          });
      });
    });
  }
}
