import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab42Page } from './tab42.page';

const routes: Routes = [
  {
    path: '',
    component: Tab42Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab42PageRoutingModule {}
