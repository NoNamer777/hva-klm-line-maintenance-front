import {Component, OnDestroy, OnInit} from '@angular/core';
import {RunsService} from '../../../services/runs.service';

import {RequestsService} from '../../../services/requests.service';
import {Request, RequestStatus} from '../../../models/request';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DeliveryConfirmationComponent} from '../delivery-confirmation/delivery-confirmation.component';
import {environment} from '../../../../environments/environment';
import {absoluteFromSourceFile} from '@angular/compiler-cli/src/ngtsc/file_system';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-my-runs',
  templateUrl: './my-runs.component.html',
  styleUrls: ['./my-runs.component.css']
})
export class MyRunsComponent implements OnInit {
  requests: Request[];

  schipholLat = environment.schipholLat;
  schipholLong = environment.schipholLong;

  constructor(
    private runsService: RunsService,
    private requestsService: RequestsService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.getFilteredRequestList(RequestStatus.inProgress);
  }

  getFilteredRequestList(filter) {
    this.requestsService.getUserRequestsByStatus(filter)
      .subscribe(requests => {
        console.log(requests);
        this.requests = requests;
      });
  }

  onDelivered(request: Request) {
    if (request.status == RequestStatus.inProgress) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.hasBackdrop = true;
      dialogConfig.width = "60%";
      dialogConfig.data = request;

      this.dialog.open(DeliveryConfirmationComponent, dialogConfig).afterClosed()
        .subscribe(()=> {
          this.getFilteredRequestList(RequestStatus.inProgress);
        });
    }
  }

  onCanceledRun(requestId: string) {
    this.requestsService.cancelRun(requestId)
      .subscribe(
        res => {
          this.toast.info("Run with request id " + requestId + " was canceled!");
          this.getFilteredRequestList(RequestStatus.inProgress);
        },
        error => {
          this.toast.error("Something went wrong canceling run with request id " + requestId)
        }
      )
  }

  onRunClicked(event) {
    let requestMapContainer = document.getElementById(event.currentTarget.id).getElementsByClassName('request-map-container')[0];
    let equipmentLocationMap = document.getElementById(event.currentTarget.id).getElementsByTagName('agm-map')[0];

    requestMapContainer.classList.toggle('show-map-container');
    equipmentLocationMap.classList.toggle('show-location-map');
  }

}
