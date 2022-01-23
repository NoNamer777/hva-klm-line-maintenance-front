// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { NewRequestComponent } from './new-request.component';
// import {ReactiveFormsModule} from '@angular/forms';
// import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle, MatNativeDateModule} from '@angular/material';
// import {AgmCoreModule, MapsAPILoader} from '@agm/core';
// import {HttpClientModule} from '@angular/common/http';
// import {ToastrModule} from 'ngx-toastr';
//
// /*
//   Author: Felipe da Cruz Gabriel
// */
//
// describe('NewRequestComponent', () => {
//   let component: NewRequestComponent;
//   let fixture: ComponentFixture<NewRequestComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ NewRequestComponent ],
//       imports: [
//         HttpClientModule,
//         ReactiveFormsModule,
//         MatDatepickerModule,
//         AgmCoreModule,
//         MatNativeDateModule,
//         ToastrModule.forRoot({
//           timeOut: 5000,
//           positionClass: 'toast-top-center',
//           preventDuplicates: true
//         })
//       ],
//       providers: [
//         { provide: MapsAPILoader, useValue: {
//             load: jasmine.createSpy('load').and.returnValue(new Promise(() => true))
//           } }
//       ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(NewRequestComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('Should open map', () => {
//     component.selectedEquipmentTypeId = 1;
//     // fixture.detectChanges();
//     expect('agm-map').toBeTruthy();
//   });
// });
