import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EquipmentService} from '../../../services/equipment.service';
import {Equipment, EquipmentStatus} from '../../../models/equipment';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Request} from '../../../models/request';
import {environment} from '../../../../environments/environment';
import {LatLongGeneratorService} from '../../../services/lat-long-generator.service';

@Component({
  selector: 'app-equipment-pick',
  templateUrl: './equipment-pick.component.html',
  styleUrls: ['./equipment-pick.component.css']
})
export class EquipmentPickComponent implements OnInit {
  availableEquipment: Equipment[] = [];
  equipmentSelect: FormGroup;

  schipholLat = environment.schipholLat;
  schipholLong = environment.schipholLong;

  constructor(
    @Inject(MAT_DIALOG_DATA) public request: Request,
    private equipmentService: EquipmentService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EquipmentPickComponent>,
    private latLongGenerator: LatLongGeneratorService
  ) { }

  ngOnInit() {
    this.loadEquipment();
  }

  loadEquipment() {
    this.equipmentService.getEquipmentByTypeAndStatus(this.request.equipmentType.id, EquipmentStatus.usable)
      .subscribe((equipmentList) => {
        this.availableEquipment = equipmentList;
      });

    this.equipmentSelect = new FormGroup({
      equipment: new FormControl()
    });
    this.equipmentSelect.controls.equipment.setValue(this.availableEquipment[0]);
  }

  onSelectEquipment(selectedEquipment: Equipment) {
    console.log(selectedEquipment);
    this.dialogRef.close(selectedEquipment);
  }

}
