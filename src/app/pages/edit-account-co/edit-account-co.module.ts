import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccountCoPageRoutingModule } from './edit-account-co-routing.module';

import { EditAccountCoPage } from './edit-account-co.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditAccountCoPageRoutingModule
  ],
  declarations: [EditAccountCoPage]
})
export class EditAccountCoPageModule {}
