import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestsService} from '../../../services/requests.service';
import {Subscription} from 'rxjs';
import {Request, RequestStatus} from '../../../models/request';
import {EquipmentService} from '../../../services/equipment.service';
import {Equipment} from '../../../models/equipment';
import {RunsService} from '../../../services/runs.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EquipmentPickComponent} from '../equipment-pick/equipment-pick.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-requests-overview',
  templateUrl: './requests-overview.component.html',
  styleUrls: ['./requests-overview.component.css']
})
export class RequestsOverviewComponent implements OnInit, OnDestroy {
  requests: Request[] = [];
  requestsSub: Subscription;

  constructor(
    private requestsService: RequestsService,
    private equipmentService: EquipmentService,
    private runsService: RunsService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.loadPickUpRequests();
    this.loadDeliveryRequests();
  }

  private loadDeliveryRequests() {
    this.requestsSub = this.requestsService.getDeliveryRequests()
      .subscribe(requests => {
        requests.forEach(request => {
          this.getRecommendedPickUp(request.id, request.equipmentType.id);
          this.requests.push(request);
        });
      });
  }

  private loadPickUpRequests() {
    this.requestsSub = this.requestsService.getPickUpRequests()
      .subscribe(requests => {
        requests.forEach(request => {
          request['pickUp'] = true;
          this.requests.push(request);
        });
      });
  }

  getRecommendedPickUp(requestId, equipmentType) {
    this.equipmentService.getBestPicks('TEST', equipmentType)
      .subscribe((equipmentList) => {
        var request: Request = this.requests.find(x => x.id == requestId);
        request.equipment = equipmentList[0];
      });
  }

  onChangeRecommended(request: Request) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = request;
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = "90%";
    dialogConfig.height = "60%";
    const dialogRef = this.dialog.open(EquipmentPickComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(equipment => {
        request.equipment = equipment;
      });
  }

  onAcceptRequest(request: Request) {
    this.requestsService.acceptRequestByRunner(request)
      .subscribe((res) => {
        console.log(res);
        this.toast.success("Request " + request.id + " added to your runs!");
        this.requests = [];
        this.loadPickUpRequests();
        this.loadDeliveryRequests();

      },
        error => {
        this.toast.error("Something went wrong, please try again!");
        });
  }

  ngOnDestroy(): void {
    this.requestsSub.unsubscribe();
  }
}
