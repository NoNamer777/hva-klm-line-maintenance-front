import {Component, OnInit} from '@angular/core';
import {EquipmentService} from '../../../services/equipment.service';
import {Equipment} from '../../../models/equipment';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EquipmentDetailsComponent} from '../equipment-details/equipment-details.component';
import {EquipmentType} from '../../../models/equipmentType';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  private equipmentList: Equipment[];

  constructor(private equipmentService: EquipmentService, private dialog: MatDialog) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.equipmentService.returnEquipmentList().subscribe(equipment => this.equipmentList = equipment);
    }, 250);
  }

  onViewEquipment(selectedEquipment: Equipment) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = selectedEquipment;
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '60%';

    this.dialog.open(EquipmentDetailsComponent, dialogConfig);
  }
}
