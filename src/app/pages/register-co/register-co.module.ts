import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCoPageRoutingModule } from './register-co-routing.module';

import { RegisterCoPage } from './register-co.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterCoPageRoutingModule
  ],
  declarations: [RegisterCoPage]
})
export class RegisterCoPageModule {}
