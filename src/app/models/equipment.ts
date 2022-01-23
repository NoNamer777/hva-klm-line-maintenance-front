import {EquipmentType} from './equipmentType';

export class Equipment {
  serialNumber: string;
  id: string;
  type: EquipmentType;
  status: string;
  statusDescription: string;
  latitude: number;
  longitude: number;

  constructor(serialNumber: string,
              id: string,
              type: EquipmentType,
              status: string,
              statusDescription: string,
              latitude?: number,
              longitude?: number,
  ) {
    this.serialNumber = serialNumber;
    this.id = id;
    this.type = type;
    this.status = status;
    this.statusDescription = statusDescription;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export enum EquipmentStatus {
  usable = 'Usable',
  inuse = 'Inuse',
  broken = 'Broken'
}
