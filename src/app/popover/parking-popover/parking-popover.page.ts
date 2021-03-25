import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-parking-popover',
  templateUrl: './parking-popover.page.html',
  styleUrls: ['./parking-popover.page.scss'],
})
export class ParkingPopoverPage implements OnInit {

  id;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  editProfil() {
    this.router.navigateByUrl("/edit-account-po", { replaceUrl: true });

  }

  editPlanning() {
    this.router.navigateByUrl("/edit-planning-po", { replaceUrl: true });

  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
