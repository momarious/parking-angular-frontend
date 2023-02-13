import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { User } from 'src/app/model/user';
import { map, take } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: User = {};

  constructor(private http: HttpClient, private storage: StorageService) {}

  login(user: User) {
    return this.http.post(`${API_CONFIG.backendUrl}/login`, user, options).pipe(
      take(1),
      map((res) => {
        let response = res as User;
        this.user = response;
        console.log('loggrd in', this.user);

        this.storage.setLocalUser(this.user);

        // this.storage.setLocalUser({
        //   id: this.user.id,
        //   firstname: this.user.firstname,
        //   lastname: this.user.lastname,
        //   email: this.user.email,
        //   password: this.user.password,
        //   phone: this.user.phone,
        //   image: this.user.image,
        //   token: this.user.token,
        //   role: this.user.role,
        //   address: {
        //     street: this.user.address.street,
        //     city: this.user.address.city,
        //     area: this.user.address.area,
        //   },
        // });

        // if (this.user.role == 'car_owner') {
        //   this.storage.setLocalUser({
        //     vehicle: {
        //       brand: this.user.vehicle.brand,
        //       registration: this.user.vehicle.registration,
        //     },
        //   });
        
        // } 

        return this.user;
      })
    );
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
