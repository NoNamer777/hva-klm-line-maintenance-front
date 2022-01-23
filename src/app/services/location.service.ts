import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Location} from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations;

  constructor(private http: HttpClient) {}

  getLocations() {
    return this.http.get<Location[]>(environment.apiUrl + "/locations");
  }
}
