import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationFirstStepPageRoutingModule } from './reservation-first-step-routing.module';

import { ReservationFirstStepPage } from './reservation-first-step.page';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    ReservationFirstStepPageRoutingModule
  ],
  declarations: [ReservationFirstStepPage]
})
export class ReservationFirstStepPageModule {}
