import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationFirstStepPage } from './reservation-first-step.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationFirstStepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationFirstStepPageRoutingModule {}
