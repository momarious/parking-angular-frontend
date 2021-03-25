import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { ProfilePopoverPage } from 'src/app/popover/profile-popover/profile-popover.page';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  user: User = {};
  vehicle: any = {};
  address: any = {};

  constructor(
    private popoverController: PopoverController,
    private storage: StorageService
  ) { }


  ngOnInit() {
    this.user = this.storage.getLocalUser();
    this.address = this.user.address;
    this.vehicle = this.user.vehicle;
  }

  async presentPopover($event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverPage,
      event: $event,
      componentProps: { id: this.user.id }
    });
    return await popover.present();
  }

}
