import {Equipment} from "./equipment";
import {Request} from "./request";

export class Run {
  id: string;
  runnerId: string;
  request: Request;
  equipment: Equipment;
  acceptedDate: Date;
  closedDate: Date;

  constructor(id: string, runnerId: string, request: Request, equipment: Equipment) {
    this.id = id;
    this.runnerId = runnerId;
    this.request = request;
    this.equipment = equipment;
    this.acceptedDate = new Date(Date.now());
  }

  setClosedDate(date: Date) {
    this.closedDate = date;
  }
}
