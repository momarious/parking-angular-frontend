import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Reservation } from 'src/app/model/reservation';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  
  constructor(public http: HttpClient) {}

  insert(obj: Reservation) {
    return this.http.post(
      `${API_CONFIG.backendUrl}/reservations`,
      obj,
      options
    );
  }

  findByUserid(id): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${API_CONFIG.backendUrl}/reservations/user/${id}`);
  }

  findByParkingd(id): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${API_CONFIG.backendUrl}/reservations/parking/${id}`);
  }

  edit(item: Reservation) {
    return this.http.post(
      `${API_CONFIG.backendUrl}/reservations/${item.id}/edit`,
      item,
      options
    );
  }

  findByParkingAndDate(id,  date): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      `${API_CONFIG.backendUrl}/reservations/parking/${id}/date/${date}`
    );
  }

}
