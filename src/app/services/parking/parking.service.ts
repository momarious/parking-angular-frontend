import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Parking } from 'src/app/model/parking';


const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ParkingService {

  constructor(public http: HttpClient) {}

  create(parking: Parking) {
    return this.http.post(
      `${API_CONFIG.backendUrl}/parkings`,
      parking,
      headers
    );
  }

  edit(parking: Parking) : Observable<Parking> {
    return this.http.post(
      `${API_CONFIG.backendUrl}/parkings/${parking.id}/edit`,
      parking,
      headers
    );
  }

  findAll(): Observable<Parking[]> {
    return this.http.get<Parking[]>(`${API_CONFIG.backendUrl}/parkings`);
  }

  findById(id: string) : Observable<Parking> {
    return this.http.get<Parking>(`${API_CONFIG.backendUrl}/parkings/${id}`);
  }

  findByName(id: string) {
    return this.http.get<Parking>(`${API_CONFIG.backendUrl}/parkings/name/${id}`);
  }


  findByUserId(id: String): Observable<Parking> {
    return this.http.get<Parking>(
      `${API_CONFIG.backendUrl}/parkings/user/${id}`
    );
  }
}
