import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LatLongGeneratorService {

  constructor() { }

  generateLatitude(): number {
    return (Math.random() * (52.315000 - 52.303000) + 52.303000);
  }

  generateLongitude(): number {
    return (Math.random() * (4.775000 - 4.754000) + 4.754000);
  }
}
