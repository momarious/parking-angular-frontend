import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCoPage } from './register-co.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCoPageRoutingModule {}
