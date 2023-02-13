import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePopoverPage } from './profile-popover.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePopoverPageRoutingModule {}
