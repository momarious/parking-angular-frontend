import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.page.html',
  styleUrls: ['./profile-popover.page.scss'],
})
export class ProfilePopoverPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {}

  editProfil() {
    this.router.navigateByUrl('/edit-account-co', { replaceUrl: true });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
