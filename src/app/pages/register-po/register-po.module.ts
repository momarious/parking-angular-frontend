import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPoPageRoutingModule } from './register-po-routing.module';

import { RegisterPoPage } from './register-po.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterPoPageRoutingModule
  ],
  declarations: [RegisterPoPage]
})
export class RegisterPoPageModule {}
