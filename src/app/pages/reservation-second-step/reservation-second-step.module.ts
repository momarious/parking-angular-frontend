import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationSecondStepPageRoutingModule } from './reservation-second-step-routing.module';

import { ReservationSecondStepPage } from './reservation-second-step.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationSecondStepPageRoutingModule
  ],
  declarations: [ReservationSecondStepPage]
})
export class ReservationSecondStepPageModule {}
