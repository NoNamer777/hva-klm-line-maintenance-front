import {TestBed} from '@angular/core/testing';

import {RequestsService} from './requests.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Aircraft, Type} from '../models/aircraft';
import {RouterTestingModule} from '@angular/router/testing';
import {EquipmentType} from '../models/equipmentType';
import {Location, LocationType} from '../models/location';
import {Equipment, EquipmentStatus} from '../models/equipment';
import {Request, RequestStatus} from '../models/request';
import {environment} from '../../environments/environment';

/*
  Author: Felipe da Cruz Gabriel
*/

describe('RequestsService', () => {
  let auth: AuthenticationService;
  let requestsService: RequestsService;
  let http: HttpClient;

  let equipmentType: EquipmentType = new EquipmentType();
  equipmentType.subgroup = 'Nitrogen cart';
  equipmentType.id = 1;
  equipmentType.group = 'Nitrogen cart';
  equipmentType.abbreviation = 'NC';

  let aircraft: Aircraft = new Aircraft();
  aircraft.name = '737-443';
  aircraft.id = 1;
  aircraft.type = Type.NB;
  aircraft.manufacturer = 'Boeing';

  let location: Location = new Location();
  location.location = 'A31';
  location.type = LocationType.pier;

  let equipment: Equipment =  new Equipment(
    '116195',
    'STOFZ-95',
    equipmentType,
    EquipmentStatus.usable,
    null
  );

  let request: Request = new Request(
    RequestStatus.inProgress,
    equipmentType,
    aircraft,
    location,
    new Date(Date.now())
  );

  request.equipment = equipment;

  beforeEach(async () => {
    TestBed.configureTestingModule({
    imports: [ HttpClientModule, RouterTestingModule ],
    providers: [
      AuthenticationService
      ]
    });
      requestsService = TestBed.get(RequestsService);
      auth = TestBed.get(AuthenticationService);
      http = TestBed.get(HttpClient);
      // auth.signIn('KLM00001', '12345');

      let equipmentType: EquipmentType = new EquipmentType();
      equipmentType.subgroup = 'Nitrogen cart';
      equipmentType.id = 1;
      equipmentType.group = 'Nitrogen cart';
      equipmentType.abbreviation = 'NC';

      let aircraft: Aircraft = new Aircraft();
      aircraft.name = '737-443';
      aircraft.id = 1;
      aircraft.type = Type.NB;
      aircraft.manufacturer = 'Boeing';

      let location: Location = new Location();
      location.location = 'A31';
      location.type = LocationType.pier;

      let equipment: Equipment =  new Equipment(
        '116195',
        'STOFZ-95',
        equipmentType,
        EquipmentStatus.usable,
        null
      );

      let request: Request = new Request(
        RequestStatus.inProgress,
        equipmentType,
        aircraft,
        location,
        new Date(Date.now())
      );

      request.equipment = equipment;
  }
  );

  it('should be created', () => {
    expect(requestsService).toBeTruthy();
  });

  it('Should get Aircrafts', async () => {
    requestsService.getAircraftTypes()
      .subscribe(res => {
        expect(res[0]).toHaveClass(Aircraft);
      })
  });

  it('Should not post request ', async function() {
    requestsService.addRequest(request)
      .subscribe(res => {
      },
          error => {
        expect(error).toBeTruthy()
      })
  });

  it('Should successfully post request ', async function() {
    let isPass = false;
    auth.signIn("KLM00005", "12345")
      .subscribe(
        res => {
          requestsService.addRequest(request)
            .subscribe(
              res => {
                isPass = true;
                expect(isPass).toEqual(true)
              });
        }
      );
  });

  it('Should not get requests without logged user', async function() {
    let isPass = false;
    requestsService.getUserCreatedRequests()
      .subscribe(
        res => {
          isPass = true;
          expect(isPass).toEqual(false)
        },
        error => {
          expect(isPass).toEqual(false)
        }
      )
  });

  it('Should not post without a valid request', async function() {
    let isPass;
    await auth.signIn("KLM00005", "12345")
      .subscribe(
        () => {
          http.post(environment.apiUrl + '/requests', 'Request')
            .subscribe(
              res => {
                isPass = true;
                },
                error => {
                  isPass = false;
              }, () => {
                expect(isPass).toEqual(false);
              })
        },
          error => {
            isPass = false;
          },
        () => {
          expect(isPass).toEqual(false);
        });
  });

  // it('Get only open requests', async () => {
  //   let bool = await auth.signIn("KLM00005", "12345").toPromise().then(res => res.ok);
  //   return requestsService.getRequestsByStatus(RequestStatus.open).toPromise().then( (result) => {
  //     console.log(result);
  //     expect(result[0].status).toEqual(RequestStatus.open);
  //   });
  // });
});
