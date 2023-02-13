import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { User } from 'src/app/model/user';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient
  ) { }

  insert(user: User)  : Observable<User> {
    return this.http.post(`${API_CONFIG.backendUrl}/users`, user, options);
  }

  // findByEmail(email: string) : Observable<User> {
  //   return this.http.get(`${API_CONFIG.backendUrl}/users/email/${email}`);
  // }

  findById(id): Observable<User>  {
    return this.http.get(`${API_CONFIG.backendUrl}/users/${id}`);

  }

  edit(item: User) {
    return this.http.post(`${API_CONFIG.backendUrl}/users/${item.id}/edit`, item, options);  
  }
}