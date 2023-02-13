import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Address } from 'src/app/model/address';
import { Parking } from 'src/app/model/parking';
import { User } from 'src/app/model/user';
import { ParkingPopoverPage } from 'src/app/popover/parking-popover/parking-popover.page';
import { ParkingService } from 'src/app/services/parking/parking.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-tab43',
  templateUrl: './tab43.page.html',
  styleUrls: ['./tab43.page.scss'],
})
export class Tab43Page implements OnInit {

  id: string;
  parking: Parking = {};
  user: User = {};
  address: Address = {};

  constructor(
    private parkingService: ParkingService,
    private storage: StorageService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.show = false;
    this.user = this.storage.getLocalUser();
    this.getParking(this.user.id);
  }

  async presentPopover($event) {
    const popover = await this.popoverController.create({
      component: ParkingPopoverPage,
      event: $event,
      componentProps: { id: this.parking.id },
    });
    return await popover.present();
  }

  //

  show: Boolean;

  day: {
    checked: false;
  };

  items: any[] = [
    {
      day: 'Lundi',
      checked: false,
      open: '00:00',
      close: '12:00',
    },
    {
      day: 'Mardi',
      checked: false,
      open: '00:00',
      close: '12:00',
    },
    {
      day: 'Mercredi',
      checked: false,
      open: '00:00',
      close: '12:00',
    },
    {
      day: 'Jeudi',
      checked: false,
      open: '00:00',
      close: '12:00',
    },
    {
      day: 'Vendredi',
      checked: false,
      open: '00:00',
      close: '12:00',
    },
    {
      day: 'Samedi',
      checked: true,
      open: '00:00',
      close: '12:00',
    },
    {
      day: 'Dimanche',
      checked: false,
      open: '00:00',
      close: '12:00',
    },
  ];

  daychecked: false;

  getSelectedItem(selectedItem) {
    console.log('_getSelectedItem', selectedItem.detail.value);
    if (selectedItem.detail.value == 'val2') {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  changeCheckState(ev: any) {}



  
  getParking(id) {
    this.parkingService.findByUserId(id).subscribe((observer) => {
      this.parking = observer;
    });
  }

}
