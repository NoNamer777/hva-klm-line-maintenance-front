import { Injectable } from '@angular/core';
import {Equipment, EquipmentStatus} from '../models/equipment';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpResponse, HttpResponseBase} from '@angular/common/http';
import {EquipmentType} from '../models/equipmentType';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  equipmentList: Equipment[] = [];

  constructor(private http: HttpClient) { }

  getEquipmentByTypeAndStatus(typeId, status) {
    return this.http.get<Equipment[]>(environment.apiUrl + "/equipment/" + typeId + "/by?status=" + status);
  }

  addNewEquipment(equipment: Equipment) {
    return this.http.post<Equipment>(environment.apiUrl + '/equipment/', equipment);
  }

  deleteEquipment(serialNumber: string) {
    return this.http.delete<Equipment>(environment.apiUrl + '/equipment/' + serialNumber);
  }

  getBestPicks(runnerLocation: string, equipmentType: string) {
    // TODO: Find the closest equipment to Runner and return it

    return this.getEquipmentByTypeAndStatus(equipmentType, EquipmentStatus.usable);
  }

  returnEquipmentList() {
    return this.http.get<Equipment[]>(environment.apiUrl + '/equipment/');
  }


  getEquipmentTypesList() {
    return this.http.get<EquipmentType[]>(environment.apiUrl + '/equipmentType/');
  }

  saveEquipment(equipment: Equipment) {
    return this.http.put<Equipment>(environment.apiUrl.concat('/equipment/').concat(equipment.serialNumber), equipment)
      .subscribe();
  }

  getEquipmentById(id: string): Observable<Equipment> {
    return of(this.equipmentList.find(equipment => equipment.id === id));
  }

  addEquipment(newEquipment: Equipment) {
    this.equipmentList.push(newEquipment);
  }

  deleteEquipmentById(id:number){
    this.equipmentList.splice(id,1)
  }

  setEquipmentStatusById(serialNumber: string, status: string) {
    return this.http.put(environment.apiUrl + "/equipment/" + serialNumber + "/newStatus", status);
  }
}
