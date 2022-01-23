import {EquipmentType} from './equipmentType';
import {Equipment} from './equipment';
import {Aircraft} from './aircraft';
import {Location} from './location';

export class Request {
  public id: string;
  public status: RequestStatus;
  public equipmentType: EquipmentType;
  public aircraft: Aircraft;
  public location: Location;

  public timestamp: Date;
  public departure: Date;

  public equipment: Equipment;
  public amountOfTires: string;

  constructor(
              status: RequestStatus,
              equipmentType: EquipmentType,
              aircraft: Aircraft,
              location: Location,
              departure: Date,
              id?: string,
              timeStamp?: Date,
              equipment?: Equipment,
              amountOfTires?: string
  ) {

    this.status = status;
    this.equipmentType = equipmentType;
    this.aircraft = aircraft;
    this.location = location;
    this.departure = departure;

    this.id = id;
    this.timestamp = timeStamp;
    this.equipment = equipment;
    this.amountOfTires = amountOfTires;
  }

}


export enum RequestStatus {
  open = 'OP',
  inProgress = 'IP',
  closed = 'CL',
  canceled = 'CAN'
}
