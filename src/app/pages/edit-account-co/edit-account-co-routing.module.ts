import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAccountCoPage } from './edit-account-co.page';

const routes: Routes = [
  {
    path: '',
    component: EditAccountCoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAccountCoPageRoutingModule {}
