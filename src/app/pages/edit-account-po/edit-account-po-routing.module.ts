import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAccountPoPage } from './edit-account-po.page';

const routes: Routes = [
  {
    path: '',
    component: EditAccountPoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAccountPoPageRoutingModule {}
