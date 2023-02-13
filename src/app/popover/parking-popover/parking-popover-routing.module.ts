import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingPopoverPage } from './parking-popover.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingPopoverPageRoutingModule {}
