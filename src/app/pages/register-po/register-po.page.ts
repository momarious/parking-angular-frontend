import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { Parking } from 'src/app/model/parking';
import { User } from 'src/app/model/user';
import { ImageService } from 'src/app/services/image/image.service';
import { ParkingService } from 'src/app/services/parking/parking.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register-po',
  templateUrl: './register-po.page.html',
  styleUrls: ['./register-po.page.scss'],
})
export class RegisterPoPage implements OnInit {

  imageName: string;
  user: User = {};
  address: {} = {};
  parking: Parking = {};
  passwordMatch = true;

  // tus = false;
  error: string | null = null;
  photo: SafeResourceUrl | null = null;
  ab;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private parkingService: ParkingService,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    private formBuiler: FormBuilder,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuiler.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordConfirm: [null, Validators.required],
      phone: [
        null,
        [Validators.required, Validators.pattern(new RegExp('[0-9 ]{9}'))],
      ],
      street: [null],
      city: [null],
      area: [null],
      registration: [null],
      brand: [null],
      //
      name: [null, Validators.required],
      description: [null],
      price: [null,  [Validators.required, Validators.pattern(new RegExp('[0-9]*'))]],
      capacity: [null,  [Validators.required, Validators.pattern(new RegExp('[0-9]*'))]],
      //
      securitycamera: [null],
      securityagent: [null],
      carwash: [null],
      protectiveroof: [null],
      //
      longitude: [null,  [Validators.required, Validators.pattern(new RegExp('[0-9.]*'))]],
      latitude: [null, [Validators.required, Validators.pattern(new RegExp('[0-9.]*'))]],
      //
    });
  }

  async signup(formData: NgForm) {
    const password = this.form.controls['password'].value;
    const passwordConfirm = this.form.controls['passwordConfirm'].value;

    if (password != passwordConfirm) {
      this.passwordMatch = false;
      return;
    }
    // this.user.address = this.address;
    // this.parking.manager = this.user.firstname + ' ' + this.user.lastname;
    // this.parking.userid = this.user.id;
    // this.user.role = 'parking_owner';

    if (this.ab) {
      this.imageName = this.imageService.makeRandom();
      await this.imageService.uploadTus(this.ab, this.imageName);
    }

    this.userService
      .insert({
        image: this.imageName,
        role: 'parking_owner',
        firstname: this.form.controls['firstname'].value,
        lastname: this.form.controls['lastname'].value,
        email: this.form.controls['email'].value,
        phone: this.form.controls['phone'].value,
        password: password,
        address: {
          street: this.form.controls['street'].value,
          city: this.form.controls['city'].value,
          area: this.form.controls['area'].value,
        }
      })
      .subscribe(
        (response) => {
          this.parkingService
            .create({
              userid: response.id,
              name: this.form.controls['name'].value,
              manager: response.firstname + ' ' + response.lastname,
              description: this.form.controls['description'].value,
              price: this.form.controls['price'].value,
              capacity: this.form.controls['capacity'].value,
              securitycamera: this.form.controls['securitycamera'].value,
              securityagent: this.form.controls['securityagent'].value,
              carwash: this.form.controls['carwash'].value,
              protectiveroof: this.form.controls['protectiveroof'].value,
              longitude: this.form.controls['longitude'].value,
              latitude: this.form.controls['latitude'].value,
            })
            .subscribe(
              () => {
                this.presentToast("Votre compte a été créer avec succés");
                this.router.navigateByUrl('/login');
              },
              () => {}
            );
        },
        (error) => {
          console.log('error:  ', error);
        }
      );
  }

  async takePhoto(): Promise<void> {
    this.ab = await this.getPhoto(CameraSource.Camera);
  }

  private async getPhoto(source: CameraSource): Promise<string | undefined> {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source,
    });

    if (image.webPath) {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
    }
    return image.webPath;
  }

  addParking(userid) {}

  // addUser() {
  //   this.userService.insert(this.user).subscribe(
  //     (response) => {
  //       // console.log("now adding parking:  ", this.user);

  //       const data = response as User;
  //       this.addParking(data.id);

  //       this.router.navigateByUrl('/login');
  //     },
  //     (error) => {
  //       console.log('error:  ', error);
  //     }
  //   );
  // }

  
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    return toast.present();
  }

}
