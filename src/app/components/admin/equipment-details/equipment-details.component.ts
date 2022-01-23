import {Component, Inject, OnInit} from '@angular/core';
import {Equipment} from '../../../models/equipment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {EquipmentService} from '../../../services/equipment.service';
import {EquipmentType} from '../../../models/equipmentType';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css'],
})
export class EquipmentDetailsComponent implements OnInit {
  private editable = false;
  private equipmentTypes: EquipmentType[];
  private equipmentList: Equipment[];
  private typeGroups: string[] = [];
  private typeSubgroups: string[] = [];
  private statuses: string[] = ['Usable', 'Inuse', 'Broken'];
  private invalid = false;
  private invalidId = false;

  private equipmentForm = new FormGroup({
    serialNumber: new FormControl(),
    id: new FormControl(),
    typeGroup: new FormControl(),
    typeSubgroup: new FormControl(),
    status: new FormControl(),
    statusDescription: new FormControl()
  });

  constructor(@Inject(MAT_DIALOG_DATA) private equipment: Equipment,
              private dialogRef: MatDialogRef<EquipmentDetailsComponent>, private equipmentService: EquipmentService) {
  }

  ngOnInit() {
    this.populateForm();
    this.equipmentService.getEquipmentTypesList().subscribe(equipmentTypes => {
      this.equipmentTypes = equipmentTypes;

      this.equipmentTypes.forEach(equipment => {
        if (!this.typeGroups.includes(equipment.group, 0)) {
          this.typeGroups.push(equipment.group);
        }
      });

      this.onTypeGroupChange();
    });

    this.equipmentService.returnEquipmentList().subscribe(equipmentList => this.equipmentList = equipmentList);

    this.equipmentForm.get('typeGroup').valueChanges.subscribe(() => {
      this.equipmentForm.patchValue({
        typeSubgroup: 'N/A'
      }, {emitEvent: false});

      this.onTypeGroupChange();
    });
  }

  populateForm() {
    this.equipmentForm.setValue({
      serialNumber: this.equipment.serialNumber,
      id: this.equipment.id.split('-')[1],
      typeGroup: this.equipment.type.group,
      typeSubgroup: this.equipment.type.subgroup,
      status: this.equipment.status,
      statusDescription: this.equipment.statusDescription
    });
  }

  getAbbreviation(): string {
    let abbreviation = 'Not Found';

    this.equipmentTypes.forEach(equipmentType => {
      if (equipmentType.group === this.equipmentForm.value.typeGroup) {
        abbreviation = equipmentType.abbreviation;
      }
    });

    return abbreviation;
  }

  onTypeGroupChange() {
    this.typeSubgroups = [];

    this.equipmentTypes.forEach(equipmentType => {
      if (equipmentType.group === this.equipmentForm.value.typeGroup) {
        this.typeSubgroups.push(equipmentType.subgroup);
      }
    });
  }

  onExit() {
    this.dialogRef.close();
  }

  onEdit() {
    this.editable = true;
  }

  onSave() {
    this.invalidId = false;
    this.invalid = false;

    const id = this.getAbbreviation().concat('-').concat(this.minTwoDigits(this.equipmentForm.value.id));

    this.equipmentList.forEach(equipment => {
      if (equipment.id === id && equipment.serialNumber !== this.equipmentForm.value.serialNumber) {
        this.invalidId = true;
      }
    });

    if (this.equipmentForm.valid && this.equipmentForm.value.typeSubgroup !== 'N/A' && !this.invalidId) {
      const equipment = this.equipmentForm.value;

      if (equipment.status === 'Broken' && equipment.statusDescription === null) {
        this.invalid = true;
      } else {
        this.equipmentTypes.forEach(equipmentType => {
          if (equipmentType.group === equipment.typeGroup && equipmentType.subgroup === equipment.typeSubgroup) {
            this.equipment.type = equipmentType;
          }
        });

        this.equipment.id = id;
        this.equipment.status = equipment.status;

        if (this.equipment.status === 'Broken') {
          this.equipment.statusDescription = equipment.statusDescription;
        } else {
          this.equipment.statusDescription = null;
        }

        this.equipmentService.saveEquipment(this.equipment);
        this.dialogRef.close();
      }
    } else {
      if (!this.invalidId) {
        this.invalid = true;
      }
    }
  }

  onDelete() {
    const confirmation = confirm('Are you sure? The piece of equipment will be gone forever!');

    if (confirmation) {
      this.equipmentService.deleteEquipment(this.equipment.serialNumber);
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.populateForm();
    this.editable = false;
    this.invalid = false;
  }

  minTwoDigits(n) {
    n = +n;
    return (n < 10 ? '0' : '') + n;
  }
}
