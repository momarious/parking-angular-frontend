import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { ImageService } from 'src/app/services/image/image.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/model/vehicle';
import { Address } from 'src/app/model/address';


import { Capacitor, Plugins, CameraResultType, FilesystemDirectory, CameraSource } from '@capacitor/core';
const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-register-co',
  templateUrl: './register-co.page.html',
  styleUrls: ['./register-co.page.scss'],
})
export class RegisterCoPage implements OnInit {

  imageName: string;
  passwordMatch = true;
  user: User = {};
  vehicle: Vehicle = {};
  address: Address = {};
  error: string | null = null;
  photo: SafeResourceUrl | null = null;
  imageUrl;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    private toastController: ToastController,
    private formBuiler: FormBuilder,
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
      registration: [null, Validators.required],
      brand: [null],
    });
  }

  async signup(formData: NgForm) {
    const password = this.form.controls['password'].value;
    const passwordConfirm = this.form.controls['passwordConfirm'].value;

    if (password != passwordConfirm) {
      this.passwordMatch = false;
      return;
    }

    if (this.imageUrl) {
      this.imageName = this.imageService.makeRandom();
      await this.imageService.uploadTus(this.imageUrl, this.imageName);
    }

    this.userService
      .insert({
        image: this.imageName,
        role: 'car_owner',
        firstname: this.form.controls['firstname'].value,
        lastname: this.form.controls['lastname'].value,
        email: this.form.controls['email'].value,
        phone: this.form.controls['phone'].value,
        password: password,
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
        () => {
          this.presentToast("Votre compte a été créer avec succés");
          this.router.navigateByUrl('/login');
        },
        () => {}
      );
  }

  async takePhoto(): Promise<void> {
    this.imageUrl = await this.getPhoto(CameraSource.Camera);
    console.log("test: ", this.imageUrl);
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

  // async takePhoto() {
  //   const options = {
  //     resultType: CameraResultType.Uri
  //   };

  //   const imageUrl = await Camera.getPhoto(options);
  //   const photoInTempStorage = await Filesystem.readFile({ path: imageUrl.path });

  //   let date = new Date(),
  //     time = date.getTime(),
  //     fileName = time + ".jpeg";

  //   await Filesystem.writeFile({
  //     data: photoInTempStorage.data,
  //     path: fileName,
  //     directory: FilesystemDirectory.Data
  //   });

  //   const finalPhotoUri = await Filesystem.getUri({
  //     directory: FilesystemDirectory.Data,
  //     path: fileName
  //   });

  //   let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);
  //   console.log(photoPath);
  // }
}