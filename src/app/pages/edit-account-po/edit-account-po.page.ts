import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { Parking } from 'src/app/model/parking';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ImageService } from 'src/app/services/image/image.service';
import { ParkingService } from 'src/app/services/parking/parking.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-account-po',
  templateUrl: './edit-account-po.page.html',
  styleUrls: ['./edit-account-po.page.scss'],
})
export class EditAccountPoPage implements OnInit {
  imageName: string;
  user: User = {};
  address: {} = {};
  parking: Parking = {};
  passwordMatch = true;
  // parking: Parking = {};

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
    private storage: StorageService,
    private router: Router,
    private authService: AuthenticationService,

  ) {}

  ngOnInit() {
    // this.user = this.storage.getLocalUser();
    // console.log(this.user);
    // this.getParking(this.user.id);

    this.user = this.storage.getLocalUser();
    // this.parking = this.getParking(this.user.id);
    
    this.form = this.formBuiler.group({
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      // password: [null, [Validators.required, Validators.minLength(8)]],
      // passwordConfirm: [null, Validators.required],
      phone: [
        this.user.phone,
        [Validators.required, Validators.pattern(new RegExp('[0-9 ]{9}'))],
      ],
      street: [this.user.address.street],
      city: [this.user.address.city],
      area: [this.user.address.area],
      // registration: [null],
      // brand: [null],
      //
      name: [this.parking.name, Validators.required],
      description: [this.parking.description],
      price: [this.parking.price,  [Validators.required, Validators.pattern(new RegExp('[0-9]*'))]],
      capacity: [this.parking.capacity,  [Validators.required, Validators.pattern(new RegExp('[0-9]*'))]],
      //
      securitycamera: [this.parking.securitycamera],
      securityagent: [this.parking.securityagent],
      carwash: [this.parking.carwash],
      protectiveroof: [this.parking.protectiveroof],
      //
      longitude: [this.parking.longitude,  [Validators.required, Validators.pattern(new RegExp('[0-9.]*'))]],
      latitude: [this.parking.latitude, [Validators.required, Validators.pattern(new RegExp('[0-9.]*'))]],
      //
    });
  }

  async signup(formData: NgForm) {
   
    // this.user.address = this.address;
    // this.parking.manager = this.user.firstname + ' ' + this.user.lastname;
    // this.parking.userid = this.user.id;
    // this.user.role = 'parking_owner';

    if (this.ab) {
      this.imageName = this.imageService.makeRandom();
      await this.imageService.uploadTus(this.ab, this.imageName);
    }

    this.userService
      .edit({
        image: this.imageName,
        role: 'parking_owner',
        firstname: this.form.controls['firstname'].value,
        lastname: this.form.controls['lastname'].value,
        email: this.form.controls['email'].value,
        phone: this.form.controls['phone'].value,
        password: this.user.password,
        address: {
          street: this.form.controls['street'].value,
          city: this.form.controls['city'].value,
          area: this.form.controls['area'].value,
        }
      })
      .subscribe(
        (response) => {
          this.parkingService
            .edit({
              userid: this.user.id,
              name: this.form.controls['name'].value,
              manager: this.user.firstname + ' ' + this.user.lastname,
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
                this.presentToast("Votre compte a été mise a jour avec succés");
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

  
  
  getParking(id) : Parking {
    this.parkingService.findByUserId(id).subscribe((observer) => {
      const parking = observer as Parking;
      console.log("p", parking);
      return parking;
    });
    return null;
  }
}
