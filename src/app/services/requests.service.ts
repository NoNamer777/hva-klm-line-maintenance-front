import {Injectable} from '@angular/core';
import {Request, RequestStatus} from '../models/request';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {EquipmentType} from '../models/equipmentType';
import {Aircraft} from '../models/aircraft';
import {Location} from '../models/location';
import {Equipment} from '../models/equipment';
// import {UserRequest} from '../models/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) {
  }

  addRequest(request: Request) {
    return this.http.post(environment.apiUrl + '/requests', request);
  }

  addSelfEquipmentPickup(request: Request) {
    console.log(request);
    return this.http.post(environment.apiUrl + '/requests/self', request);
  }

  closeSelfEquipmentPickUp(requestId: string) {
    return this.http.put(environment.apiUrl + '/requests/self-close', requestId);
  }

  getSelfEquipmentPickupList(): Observable<Request[]> {
    return this.http.get<Request[]>(environment.apiUrl + '/requests/self');
  }

  getUserCreatedRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(environment.apiUrl + '/requests/user-created');
  }

  getUserRequestsByStatus(status: RequestStatus): Observable<Request[]> {
    return this.http.get<Request[]>(environment.apiUrl + '/requests/by?status=' + status);
  }

  getRequestsByStatus(status: RequestStatus): Observable<Request[]> {
    return this.http.get<Request[]>(environment.apiUrl + '/requests/by?status=' + status );
  }

  setRequestAsDelivered(requestId: string) {
    return this.http.put(environment.apiUrl + '/requests/confirm-delivery', requestId);
  }

  acceptRequestByRunner(request: Request) {
    return this.http.post(environment.apiUrl + '/requests/accepted', request);
  }

  cancelRequest(requestId: string) {
    return this.http.put(environment.apiUrl + '/requests/cancel', requestId);
  }

  cancelRun(requestId: string) {
    return this.http.put(environment.apiUrl + '/requests/cancel-run', requestId);
  }

  requestPickUp(requestId: string) {
    return this.http.put(environment.apiUrl + '/requests/pick-up', requestId);
  }

  getPickUpRequests() {
    return this.http.get<Request[]>(environment.apiUrl + '/user-requests/pickup');
  }

  getDeliveryRequests() {
    return this.http.get<Request[]>(environment.apiUrl + '/user-requests/delivery');
  }

  getAircraftTypes() {
    return this.http.get<Aircraft[]>(environment.apiUrl + '/aircraft/');
  }
}
