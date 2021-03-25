import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPlanningPoPageRoutingModule } from './edit-planning-po-routing.module';

import { EditPlanningPoPage } from './edit-planning-po.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPlanningPoPageRoutingModule
  ],
  declarations: [EditPlanningPoPage]
})
export class EditPlanningPoPageModule {}
