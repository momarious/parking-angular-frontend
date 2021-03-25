import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkingPopoverPageRoutingModule } from './parking-popover-routing.module';

import { ParkingPopoverPage } from './parking-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingPopoverPageRoutingModule
  ],
  declarations: [ParkingPopoverPage]
})
export class ParkingPopoverPageModule {}
