import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = {};

  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.user).subscribe(
      async (res) => {
        await loading.dismiss();
        if (res) {
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        } else {
          this.presentToast();
        }
      },
      async (res) => {
        await loading.dismiss();
        // this.presentAlert();
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Email ou mot de pass incorrect',
      duration: 2000,
      position: 'bottom',
    });
    return toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
