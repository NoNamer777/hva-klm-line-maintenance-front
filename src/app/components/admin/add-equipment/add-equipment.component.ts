import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EquipmentService} from '../../../services/equipment.service';
import {Equipment} from '../../../models/equipment';
import {Router} from '@angular/router';
import {EquipmentType} from '../../../models/equipmentType';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {
  private equipmentList: Equipment[];
  private equipmentTypes: EquipmentType[];
  private typeGroups: string[] = [];
  private typeSubgroups: string[] = [];
  private invalidIdentifier = false;

  private equipmentForm = new FormGroup({
    serialNumber: new FormControl(),
    id: new FormControl(),
    typeGroup: new FormControl(),
    typeSubgroup: new FormControl()
  });

  constructor(private equipmentService: EquipmentService, private router: Router) {
  }

  ngOnInit() {
    this.equipmentService.returnEquipmentList().subscribe(equipment => this.equipmentList = equipment);

    this.equipmentService.getEquipmentTypesList().subscribe(equipmentTypes => {
      this.equipmentTypes = equipmentTypes;

      this.equipmentTypes.forEach(equipment => {
        if (!this.typeGroups.includes(equipment.group, 0)) {
          this.typeGroups.push(equipment.group);
        }
      });
    });

    this.equipmentForm.get('typeGroup').valueChanges.subscribe(() => {
      this.onTypeGroupChange();
    });
  }

  onTypeGroupChange() {
    this.typeSubgroups = [];
    this.equipmentForm.patchValue({
      typeSubgroup: 'N/A'
    }, {emitEvent: false});

    this.equipmentTypes.forEach(equipmentType => {
      if (equipmentType.group === this.equipmentForm.value.typeGroup) {
        this.typeSubgroups.push(equipmentType.subgroup);
      }
    });
  }

  getAbbreviation(): string {
    let abbreviation = '';

    this.equipmentTypes.forEach(equipmentType => {
      if (equipmentType.group === this.equipmentForm.value.typeGroup) {
        abbreviation = equipmentType.abbreviation;
      }
    });

    return abbreviation;
  }

  onAddEquipment() {
    if (this.equipmentForm.valid && this.equipmentForm.value.typeSubgroup !== 'N/A') {
      this.invalidIdentifier = false;
      const equipmentValue = this.equipmentForm.value;
      const newEquipment: Equipment = new Equipment(equipmentValue.serialNumber, equipmentValue.id, null,
        'Usable', null, null);
      const id = this.getAbbreviation().concat('-').concat(this.minTwoDigits(equipmentValue.id));

      this.equipmentList.forEach(equipment => {
        if (equipment.serialNumber === equipmentValue.serialNumber || equipment.id === id) {
          this.invalidIdentifier = true;
        }
      });

      if (!this.invalidIdentifier) {
        this.equipmentTypes.forEach(equipmentType => {
          if (equipmentType.group === equipmentValue.typeGroup && equipmentType.subgroup === equipmentValue.typeSubgroup) {
            newEquipment.type = equipmentType;
          }
        });

        newEquipment.id = id;

        this.equipmentService.addNewEquipment(newEquipment);
        this.router.navigate(['../../equipment']);
      }
    }
  }

  minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }

  onCancel() {
    let confirmation = true;
    if (this.equipmentForm.dirty) {
      confirmation = confirm('Are you sure? All changes will be discarded if you continue!');
    }

    if (confirmation) {
      this.router.navigate(['../../equipment']);
    }
  }
}
