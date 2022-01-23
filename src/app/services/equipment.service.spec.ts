import {getTestBed, TestBed} from '@angular/core/testing';
import {EquipmentService} from './equipment.service';
import {Equipment, EquipmentStatus} from '../models/equipment';
import {EquipmentType} from '../models/equipmentType';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';


/*
  Author: Ilias Delawar , 500783016
*/

describe('Equipment', () => {

  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: EquipmentService;
  let injector: TestBed;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(EquipmentService);
    injector = getTestBed();

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // Angular default test added when you generate a service using the CLI
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it("returnEquipments should return data", () => {
  //   let equipmentType: EquipmentType = new EquipmentType();
  //   equipmentType.subgroup = 'Nitrogen cart';
  //   equipmentType.id = 2;
  //   equipmentType.group = 'Nitrogen cart';
  //   equipmentType.abbreviation = 'NC';
  //
  //   // let  mockEquipment = new Equipment('STK003', 'Ilias', equipmentType, EquipmentStatus.usable, null, 0, 0);
  //
  //   // const dummyList = [mockEquipment];
  //
  //   const dummyList: Equipment[]  = [{
  //     serialNumber: "STK0003",
  //     id: "Ilias" ,
  //     type: equipmentType,
  //     status : EquipmentStatus.usable,
  //     statusDescription: null,
  //     longitude: 0,
  //     latitude: 0
  //   }];
  //
  //
  //   spyOn(service,'returnEquipmentList').and.returnValue(of(dummyList));
  //
  //
  //   service.returnEquipmentList().subscribe((res) => {
  //     expect(res).toEqual(dummyList)
  //   });
  //
  //   const req = httpTestingController.expectOne('http://localhost:8080/equipment/');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(dummyList);
  //
  // });


  it("getEquipmentById should return one Object of equipment",  ()=>{

    let equipmentType: EquipmentType = new EquipmentType();
    equipmentType.subgroup = 'Nitrogen cart';
    equipmentType.id = 2;
    equipmentType.group = 'Nitrogen cart';
    equipmentType.abbreviation = 'NC';

    const dummyEquipment ={
      serialNumber: "STK0003",
      id: "Ilias" ,
      type: equipmentType,
      status : EquipmentStatus.usable,
      statusDescription: null,
      longitude: 0,
      latitude: 0
    };

    spyOn(service,'getEquipmentById').withArgs("STK0003").and.returnValue(of(dummyEquipment));

    service.getEquipmentById("STK0003").subscribe((data:any) => {
      expect(data).toEqual(dummyEquipment);
    })

  })
  });

