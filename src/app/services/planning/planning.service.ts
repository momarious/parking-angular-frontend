import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Planning } from 'src/app/model/planning';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(public http: HttpClient) {}

  findByParkingId(id: String): Observable<Planning> {
    return this.http.get<Planning>(
      `${API_CONFIG.backendUrl}/plannings/parking/${id}`
    );
  }}
