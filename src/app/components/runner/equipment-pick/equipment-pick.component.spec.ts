import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentPickComponent } from './equipment-pick.component';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {FitBoundsService} from '@agm/core/services/fit-bounds';
import {EquipmentType} from '../../../models/equipmentType';
import {Aircraft, Type} from '../../../models/aircraft';
import {Location, LocationType} from '../../../models/location';
import {Equipment, EquipmentStatus} from '../../../models/equipment';
import {Request, RequestStatus} from '../../../models/request';
import {AuthenticationService} from '../../../services/authentication.service';
import {RouterTestingModule} from '@angular/router/testing';

/*
  Author: Felipe da Cruz Gabriel
*/

describe('EquipmentPickComponent', () => {
  let component: EquipmentPickComponent;
  let fixture: ComponentFixture<EquipmentPickComponent>;

  let equipmentType: EquipmentType;
  let aircraft: Aircraft;
  let location: Location;
  let equipment: Equipment;
  let request: Request;

  let auth: AuthenticationService;

  beforeEach(async(() => {
    equipmentType = new EquipmentType();
    equipmentType.subgroup = 'Nitrogen cart';
    equipmentType.id = 1;
    equipmentType.group = 'Nitrogen cart';
    equipmentType.abbreviation = 'NC';

    aircraft = new Aircraft();
    aircraft.name = '737-443';
    aircraft.id = 1;
    aircraft.type = Type.NB;
    aircraft.manufacturer = 'Boeing';

    location = new Location();
    location.location = 'A31';
    location.type = LocationType.pier;

    equipment =  new Equipment(
      '116195',
      'STOFZ-95',
      equipmentType,
      EquipmentStatus.usable,
      null
    );

    request = new Request(
      RequestStatus.inProgress,
      equipmentType,
      aircraft,
      location,
      new Date(Date.now())
    );

    request.equipment = equipment;
    TestBed.configureTestingModule({
      declarations: [ EquipmentPickComponent ],
      imports: [ AgmCoreModule, MatDialogModule, HttpClientModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [
        AuthenticationService,
        { provide: MAT_DIALOG_DATA, useValue: request },
        { provide: MatDialogRef, useValue: EquipmentPickComponent },
        { provide: MapsAPILoader, useValue: {
            load: jasmine.createSpy('load').and.returnValue(new Promise(() => true))
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentPickComponent);
    component = fixture.componentInstance;
    auth = fixture.debugElement.injector.get(AuthenticationService);
    auth.signIn("KLM00001", "KLM00002");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //  Tests if the map loads
  it('Agm map should load', async () => {
    expect('agm-map').toBeTruthy();
  })
});
