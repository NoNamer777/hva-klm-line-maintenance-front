import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeliveryConfirmationComponent} from './delivery-confirmation.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {Request, RequestStatus} from '../../../models/request';
import {EquipmentType} from '../../../models/equipmentType';
import {Aircraft, Type} from '../../../models/aircraft';
import {Location, LocationType} from '../../../models/location';
import {Equipment, EquipmentStatus} from '../../../models/equipment';

describe('DeliveryConfirmationComponent', () => {
  let component: DeliveryConfirmationComponent;
  let fixture: ComponentFixture<DeliveryConfirmationComponent>;

  beforeEach(async(() => {
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


    TestBed.configureTestingModule({
      declarations: [
        DeliveryConfirmationComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
        ToastrModule.forRoot({
          timeOut: 5000,
          positionClass: 'toast-top-center',
          preventDuplicates: true
        })
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: request },
        { provide: MatDialogRef, useValue: DeliveryConfirmationComponent }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryConfirmationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
