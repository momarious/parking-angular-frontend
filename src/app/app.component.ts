import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    if (this.storage.getLocalUser() != null) {
      if (this.storage.getLocalUser().role == 'parking_owner') {
        this.router.navigateByUrl('/tabs/tab42');
      } else {
        this.router.navigateByUrl('/tabs/tab1');
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
