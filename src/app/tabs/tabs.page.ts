import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  tabs = [];

  constructor(
    private storage: StorageService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.storage.getLocalUser().role == 'parking_owner') {
      this.tabs = [
        {
          button: 'tab42',
          icon: 'hourglass-sharp',
          label: 'Reservations',
        },
        { button: 'tab43', icon: 'person-circle-sharp', label: 'Mon Parking' },
      ];
      this.router.navigateByUrl('/tabs/tab42');
    } else {
      this.tabs = [
        { button: 'tab1', icon: 'list-circle-sharp', label: 'Parkings' },
        {
          button: 'tab2',
          icon: 'hourglass-sharp',
          label: 'Reservations',
        },
        { button: 'tab3', icon: 'person-circle-sharp', label: 'Mon profil' },
      ];
      this.router.navigateByUrl('/tabs/tab1');
    }
  }
}
