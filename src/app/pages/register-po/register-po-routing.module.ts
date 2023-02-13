import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPoPage } from './register-po.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPoPageRoutingModule {}
