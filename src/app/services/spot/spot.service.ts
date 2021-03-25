import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Spot } from 'src/app/model/spot';



const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SpotService {
  
   constructor(public http: HttpClient) {}

   create(parking: Spot) {
    return this.http.post(
      `${API_CONFIG.backendUrl}/spots`,
      parking,
      headers
    );
  }

  edit(item: Spot) {
    return this.http.post(`${API_CONFIG.backendUrl}/spots/${item.id}/edit`, item, headers);  
  }

  findByParkingAndDate(id,  date): Observable<Spot> {
    return this.http.get<Spot>(
      `${API_CONFIG.backendUrl}/spots/parking/${id}/date/${date}`
    );
  }

  findAvailableByParkingAndDateAndTime(id, date, time) {
    // throw new Error("Method not implemented.");
    // return this.http.post(`${API_CONFIG.backendUrl}/spots/parking/${id}/date/${date}/time/${time}`, item, headers);  
    return this.http.get<Spot>(
      `${API_CONFIG.backendUrl}/spots/parking/${id}/date/${date}/time/${time}`
    );

  }
}
