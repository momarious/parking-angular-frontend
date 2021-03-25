import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccountPoPageRoutingModule } from './edit-account-po-routing.module';

import { EditAccountPoPage } from './edit-account-po.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditAccountPoPageRoutingModule
  ],
  declarations: [EditAccountPoPage]
})
export class EditAccountPoPageModule {}
