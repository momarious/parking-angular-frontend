import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePopoverPageRoutingModule } from './profile-popover-routing.module';

import { ProfilePopoverPage } from './profile-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePopoverPageRoutingModule
  ],
  declarations: [ProfilePopoverPage]
})
export class ProfilePopoverPageModule {}
