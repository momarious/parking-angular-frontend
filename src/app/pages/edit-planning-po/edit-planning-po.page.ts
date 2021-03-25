import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Parking } from 'src/app/model/parking';
import { Planning } from 'src/app/model/planning';
import { Planningitem } from 'src/app/model/planningitem';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ParkingService } from 'src/app/services/parking/parking.service';
import { PlanningService } from 'src/app/services/planning/planning.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-planning-po',
  templateUrl: './edit-planning-po.page.html',
  styleUrls: ['./edit-planning-po.page.scss'],
})
export class EditPlanningPoPage implements OnInit {

  parking: Parking = {};
  user: User = {};
  planning: Planning = {};
  monday: Planningitem = {
    day: 'Lundi',
  };
  tuesday: Planningitem = {
    day: 'Mardi',
  };
  wednesday: Planningitem = {
    day: 'Mercredi',
  };
  thursday: Planningitem = {
    day: 'Jeudi',
  };
  friday: Planningitem = {
    day: 'Vendredi',
  };
  saturday: Planningitem = { day: 'Samedi' };
  sunday: Planningitem = { day: 'Dimanche' };

  constructor(
    private storage: StorageService,
    private auth: AuthenticationService,
    private parkingService: ParkingService,
    private router: Router,
    private toastController: ToastController
    // private storageService: StorageService
  ) {}

  ngOnInit() {
    this.user = this.storage.getLocalUser();
    this.parkingService.findByUserId(this.user.id).subscribe((response) => {
          this.parking = response;
          this.planning = this.parking.planning;
          //
          this.monday = this.planning.monday;
          this.tuesday = this.planning.tuesday;
          this.wednesday = this.planning.wednesday;
          this.thursday = this.planning.thursday;
          this.friday = this.planning.friday;
          this.saturday = this.planning.saturday;
          this.sunday = this.planning.sunday;
        });
    
  }

  submit() {
    this.parking.planning = {
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      saturday: this.saturday,
      sunday: this.sunday,
    };
    this.parkingService.edit(this.parking).subscribe(
      (response) => {
        this.presentToast();
        this.router.navigateByUrl('/tabs/tab43')
      },
      () => {}
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Les horaires ont été modifié.',
      duration: 2000
    });
    toast.present();
  }
}
