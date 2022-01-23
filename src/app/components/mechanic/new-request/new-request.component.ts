import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {RequestsService} from '../../../services/requests.service';
import {EquipmentService} from '../../../services/equipment.service';
import {EquipmentType} from '../../../models/equipmentType';
import {LocationService} from '../../../services/location.service';
import {Location} from '../../../models/location';
import {Aircraft} from '../../../models/aircraft';
import {environment} from '../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Equipment} from '../../../models/equipment';
import {LatLongGeneratorService} from '../../../services/lat-long-generator.service';
import {Request, RequestStatus} from '../../../models/request';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit, OnDestroy {
  requestForm: FormGroup;
  selectedEquipmentTypeSub: Subscription;
  isWheelCarSelected: boolean = false;

  equipmentTypeList: EquipmentType[];
  locations: Location[] = [];
  aircrafts: Aircraft[] = [];
  wheelType = [];

  selectedEquipmentTypeId: number = null;

  latitude = environment.schipholLat;
  longitude = environment.schipholLong;

  availableNitrogenCartList: Equipment[];
  selectedEquipment: Equipment;

  constructor(private requestsService: RequestsService,
              private equipmentService: EquipmentService,
              private locationService: LocationService,
              private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadFormOptions();
    this.createRequestForm();
  }

  loadFormOptions() {
    //  Gets teh equipment type options from the database
    this.equipmentService.getEquipmentTypesList().subscribe(
      (equipmentTypes) => {
        this.equipmentTypeList = equipmentTypes;
      });
    //  Gets the locations options from the database
    this.locationService.getLocations().subscribe(
      (locations) => {
        this.locations = locations;
      });
    //  Gets the aircraft types from the database
    this.requestsService.getAircraftTypes().subscribe(
      (aircrafts) => {
        this.aircrafts = aircrafts;
      });
  }

  createRequestForm() {
    this.selectedEquipmentTypeId = null;
    //  Form creation with validation
    let equipment = new FormControl([], [Validators.required]);
    this.requestForm = new FormGroup({
      equipment,
      aircraft: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      departureDate: new FormControl(new Date(Date.now()), Validators.required),
      departureHour: new FormControl('', [Validators.required, Validators.pattern(/^([01]?\d|2[0-3])$/)]),
      departureMinute: new FormControl('', [Validators.required, Validators.pattern(/^[0-5]?\d$/)])
    });

    //  Subscription for checking if a wheel type equipment is selected
    this.selectedEquipmentTypeSub = equipment.valueChanges.subscribe(selectedEquipmentType => {
      if (selectedEquipmentType) {
        this.selectedEquipmentTypeId = selectedEquipmentType.id;
        this.setUpConditionalFormFields(selectedEquipmentType);
        if (selectedEquipmentType.id === 1) {
          this.getAvailableNitrogenCarts();
        } else {
          this.selectedEquipment = null;
        }
      }
    });
  }

  getAvailableNitrogenCarts() {
    this.equipmentService.getEquipmentByTypeAndStatus(1, 'Usable')
      .subscribe(nitrogenCartList => {
        this.availableNitrogenCartList = nitrogenCartList;
      })
  }

  setUpConditionalFormFields(selectedEquipmentType) {
    selectedEquipmentType.id === 2 || selectedEquipmentType.id === 3 ? this.isWheelCarSelected = true : this.isWheelCarSelected = false;
    if (selectedEquipmentType.id === 2) {
      this.requestForm.addControl('mainWheelAmount', new FormControl(0, [Validators.pattern('[0-9]'), Validators.required]));
      this.requestForm.addControl('noseWheelAmount', new FormControl(0, [Validators.pattern('[0-9]'), Validators.required]));
      this.wheelType = ['main', 'nose'];
    } else if (selectedEquipmentType.id === 3) {
      this.requestForm.addControl('noseWheelAmount', new FormControl(0, [Validators.pattern('[0-9]'), Validators.required]));
      this.requestForm.removeControl('mainWheelAmount');
      this.wheelType = ['nose'];
    } else {
      this.requestForm.removeControl('mainWheelAmount');
      this.requestForm.removeControl('noseWheelAmount');
    }
  }

  onNitrogenMarkerClick(nitrogenCart: Equipment) {
    this.selectedEquipment = nitrogenCart;

    this.toastr.info(nitrogenCart.id + " selected!");
  }

  createRequest(): Request {
    var equipmentType: EquipmentType = this.requestForm.value['equipment'];
    var aircraftType: Aircraft = this.requestForm.value['aircraft'];
    var requestedLocation: Location = this.requestForm.value['location'];
    var departure: Date = new Date(this.requestForm.value['departureDate']);
    departure.setHours(this.requestForm.value['departureHour']);
    departure.setMinutes(this.requestForm.value['departureMinute']);
    departure.setSeconds(0);

    var request: Request = new Request(
      RequestStatus.open,
      equipmentType,
      aircraftType,
      requestedLocation,
      departure
    );
    return request;
  }

  onRequestEquipment() {
    if (this.requestForm.valid) {
      let request: Request = this.createRequest();
      this.requestsService.addRequest(request).subscribe(
        response => {
          this.toastr.success("Request has been successfully send!");
          this.onClear();
        },
        (error) => {
          //  This code will request if an error occurs while sending request
          console.log(error);
          this.toastr.error("Something went wrong try again!");
        },
        () => {
          //  This code will run when the request is completed
        }
      );
    } else {
      this.toastr.warning("Make sure to fill in all required fields!");
    }
  }

  onPickUp() {
    if (this.requestForm.valid) {
      let request: Request = this.createRequest();
      request.equipment = this.selectedEquipment;
      this.requestsService.addSelfEquipmentPickup(request).subscribe(
        response => {
          this.toastr.success(this.selectedEquipment.id + " is ready for pick up!");
          this.onClear();
        },
        (error) => {
          //  This code will request if an error occurs while sending request
          console.log(error);
          this.toastr.error("Something went wrong try again!");
        },
        () => {
          //  This code will run when the request is completed
        }
      );
    } else {
      this.toastr.warning("Make sure to fill in all required fields!");
    }
  }

  onClear() {
    this.requestForm.reset();
    this.createRequestForm();
    this.selectedEquipmentTypeId = null;
    this.isWheelCarSelected = false;
  }

  ngOnDestroy(): void {
    this.selectedEquipmentTypeSub.unsubscribe();
  }

}
