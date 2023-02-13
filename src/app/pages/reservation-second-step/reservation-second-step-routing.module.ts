import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationSecondStepPage } from './reservation-second-step.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationSecondStepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationSecondStepPageRoutingModule {}
