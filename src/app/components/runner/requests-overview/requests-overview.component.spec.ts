// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { RequestsOverviewComponent } from './requests-overview.component';
// import {HttpClientModule} from '@angular/common/http';
// import {MatDialog, MatDialogModule} from '@angular/material';
// import {EquipmentPickComponent} from '../equipment-pick/equipment-pick.component';
// import {TOAST_CONFIG, ToastrModule} from 'ngx-toastr';
// import {InjectionToken} from '@angular/core';
// import {EquipmentType} from '../../../models/equipmentType';
// import {Aircraft, Type} from '../../../models/aircraft';
// import {Location, LocationType} from '../../../models/location';
// import {Equipment, EquipmentStatus} from '../../../models/equipment';
// import {Request, RequestStatus} from '../../../models/request';
// import {By} from '@angular/platform-browser';
// import {RequestsService} from '../../../services/requests.service';
// import {Observable, of} from 'rxjs';
// import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
// import {environment} from "../../../../environments/environment";
// import {AuthenticationService} from "../../../services/authentication.service";
// import {RouterTestingModule} from "@angular/router/testing";
//
// describe('RequestsOverviewComponent', () => {
//   let component: RequestsOverviewComponent;
//   let fixture: ComponentFixture<RequestsOverviewComponent>;
//   let componentHtml: HTMLElement;
//   let requestsService: RequestsService;
//   let httpMock: HttpTestingController;
//
//   let equipmentType: EquipmentType;
//   let aircraft: Aircraft;
//   let location: Location;
//   let equipment: Equipment;
//   let request: Request;
//   let requests: Request[];
//
//   function getRequests(): Observable<Request[]> {
//     requests = [];
//     equipmentType = new EquipmentType();
//     equipmentType.subgroup = 'Nitrogen cart';
//     equipmentType.id = 1;
//     equipmentType.group = 'Nitrogen cart';
//     equipmentType.abbreviation = 'NC';
//
//     aircraft= new Aircraft();
//     aircraft.name = '737-443';
//     aircraft.id = 1;
//     aircraft.type = Type.NB;
//     aircraft.manufacturer = 'Boeing';
//
//     location = new Location();
//     location.location = 'A31';
//     location.type = LocationType.pier;
//
//     equipment =  new Equipment(
//       '116195',
//       'STOFZ-95',
//       equipmentType,
//       EquipmentStatus.usable,
//       null
//     );
//
//     request = new Request(
//       RequestStatus.inProgress,
//       equipmentType,
//       aircraft,
//       location,
//       new Date(Date.now())
//     );
//
//     request.equipment = equipment;
//     requests.push(request);
//     return of(requests);
//   }
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ RequestsOverviewComponent ],
//       imports: [
//         MatDialogModule,
//         HttpClientTestingModule,
//         RouterTestingModule,
//         ToastrModule.forRoot({
//           timeOut: 5000,
//           positionClass: 'toast-top-center',
//           preventDuplicates: true
//         })
//       ],
//       providers: [ AuthenticationService ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(RequestsOverviewComponent);
//     httpMock = TestBed.get(HttpTestingController);
//     component = fixture.componentInstance;
//     componentHtml = fixture.nativeElement;
//     requestsService = fixture.debugElement.injector.get(RequestsService);
//     fixture.detectChanges();
//   });
//
//   afterEach(() => {
//     httpMock.verify();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('Should not show requests in overview when no request available', async () => {
//     let spy = spyOn(requestsService, 'getPickUpRequests').and.returnValue(getRequests());
//     component.requests = [];
//     fixture.detectChanges();
//     expect(fixture.debugElement.query(By.css('.request'))).toBeFalsy();
//   });
//
//   it('Should return 0 requests ', function () {
//     let mockArr: Request[] = [];
//     requestsService.getPickUpRequests().subscribe(data => {
//       console.log("=======================");
//       console.log(data);
//       expect(data.length).toEqual(0);
//     });
//
//     const req = httpMock.expectOne('http://localhost:8080/user-requests/pickup');
//     expect(req.request.method).toBe('GET');
//     req.flush(mockArr);
//   });
// });
