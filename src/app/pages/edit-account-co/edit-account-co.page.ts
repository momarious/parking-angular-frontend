import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { Plugins, CameraRe } from '@capacitor/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { ImageService } from 'src/app/services/image/image.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/model/vehicle';
import { Address } from 'src/app/model/address';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-edit-account-co',
  templateUrl: './edit-account-co.page.html',
  styleUrls: ['./edit-account-co.page.scss'],
})
export class EditAccountCoPage implements OnInit {

  
  imageName: string;
  passwordMatch = true;
  user: User = {};
  vehicle: Vehicle = {};
  address: Address = {};
  error: string | null = null;
  photo: SafeResourceUrl | null = null;
  ab;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    private toastController: ToastController,
    private formBuiler: FormBuilder,
    private storage: StorageService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.storage.getLocalUser();
    this.form = this.formBuiler.group({
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      // password: [this.user.password, [Validators.required, Validators.minLength(8)]],
      // passwordConfirm: [this.user.passwordConfirm, Validators.required],
      phone: [
        this.user.phone,
        [Validators.required, Validators.pattern(new RegExp('[0-9 ]{9}'))],
      ],
      street: [this.user.address.street],
      city: [this.user.address.city],
      area: [this.user.address.area],
      registration: [this.user.vehicle.registration, Validators.required],
      brand: [this.user.vehicle.brand],
    });
  }

  async submit(formData: NgForm) {
    // const password = this.form.controls['password'].value;
    // const passwordConfirm = this.form.controls['passwordConfirm'].value;

    // if (password != passwordConfirm) {
    //   this.passwordMatch = false;
    //   return;
    // }

    if (this.ab) {
      this.imageName = this.imageService.makeRandom();
      await this.imageService.uploadTus(this.ab, this.imageName);
    }

    // const user = {
    //   image: this.imageName,
    //   role: 'car_owner',
    //   firstname: this.form.controls['firstname'].value,
    //   lastname: this.form.controls['lastname'].value,
    //   email: this.form.controls['email'].value,
    //   phone: this.form.controls['phone'].value,
    //   password: password,
    //   address: {
    //     street: this.form.controls['street'].value,
    //     city: this.form.controls['city'].value,
    //     area: this.form.controls['area'].value,
    //   },
    //   vehicle: {
    //     brand: this.form.controls['brand'].value,
    //     registration: this.form.controls['registration'].value,
    //   },
    // };

    // console.log(user);

    this.userService
      .edit({
        id: this.user.id,
        image: this.imageName,
        role: 'car_owner',
        firstname: this.form.controls['firstname'].value,
        lastname: this.form.controls['lastname'].value,
        email: this.form.controls['email'].value,
        phone: this.form.controls['phone'].value,
        password: this.user.password,
        address: {
          street: this.form.controls['street'].value,
          city: this.form.controls['city'].value,
          area: this.form.controls['area'].value,
        },
        vehicle: {
          brand: this.form.controls['brand'].value,
          registration: this.form.controls['registration'].value,
        },
      })
      .subscribe(
        (response) => {
          this.presentToast("Votre compte a été mise a jour avec succés");
          const user = response as User;
          this.storage.setLocalUser(user);
          this.router.navigateByUrl('/tabs');
        },
        () => {}
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    return toast.present();
  }
}
